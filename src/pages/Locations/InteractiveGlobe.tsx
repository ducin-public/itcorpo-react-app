import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { GlobeMethods } from 'react-globe.gl';

import { Legend } from './Legend';

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
}

export interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

interface InteractiveGlobeProps {
  points: Location[];
  arcs?: Arc[];
  initialCoordinates?: { lat: number; lng: number };
}

export const InteractiveGlobe = ({
  points, arcs, initialCoordinates = { lat: 50, lng: 10 }
}: InteractiveGlobeProps) => {
  const globeRef = useRef<GlobeMethods>();
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [chosenLocation, setChosenLocation] = useState<Location>();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !chosenLocation;
      globeRef.current.controls().autoRotateSpeed = 0.3;
      
      if (!chosenLocation) {
        globeRef.current.pointOfView({ ...initialCoordinates, altitude: 2.5 }, 1000);
      }
    }
  }, [chosenLocation, initialCoordinates]);

  useEffect(() => {
    if (globeContainerRef.current) {
      const { offsetWidth, offsetHeight } = globeContainerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }

    const handleResize = () => {
      if (globeContainerRef.current) {
        const { offsetWidth, offsetHeight } = globeContainerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectLocation = (location: Location) => {
    setChosenLocation(location);
    
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: location.lat,
        lng: location.lng,
        altitude: 0.5,
      }, 1000);
    }
  };

  const handleClearSelection = () => {
    setChosenLocation(undefined);
  };

  return (
    <div ref={globeContainerRef} className="w-full h-full relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        onPointClick={(obj) => {
          if (!chosenLocation) {
            handleSelectLocation(obj as Location);
          } else {
            handleClearSelection();
          }
        }}
        pointAltitude={0}
        pointRadius="size"
        pointLabel={(obj) => {
          const location = obj as Location;
          return <h2>{location.name}</h2> as React.ReactHTMLElement<HTMLElement>
        }}
        arcsData={arcs}
        arcColor="color"
        arcStroke={0.2}
        arcLabel={obj => {
          console.log(obj);
          return JSON.stringify(obj, null, 2);
        }}

        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 6000 + 500}
        
        arcsTransitionDuration={1000}
        arcAltitude={0.3}
        atmosphereColor="#3B82F6"
        atmosphereAltitude={0.3}
        pointsTransitionDuration={1000}
        width={dimensions.width}
        height={dimensions.height}
      />

      <Legend
        header="Locations"
        items={points}
        selectedItem={chosenLocation}
        onItemSelect={handleSelectLocation}  // renamed from onItemClick
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};
