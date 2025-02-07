import { Globe2 } from "lucide-react";
import { v4 as uuid } from "uuid";

import { InteractiveGlobe, Location, Arc } from "./InteractiveGlobe";
import { offices } from './offices'
import { generateLightHexColor } from "./colors";

const locations: Location[] = offices.map(office => ({
  id: uuid(),
  name: office.city,
  lat: office.coordinates.lat,
  lng: office.coordinates.long,
  size: 0.25,
  color: generateLightHexColor()
}));

// Generate all possible pairs from a set of indices
function generatePairs(indices: number[]): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 0; i < indices.length; i++) {
    for (let j = i + 1; j < indices.length; j++) {
      pairs.push([indices[i], indices[j]]);
    }
  }
  return pairs;
}

const locationCombinations = [
  new Set([0, 1, 6]),
  new Set([2, 3, 4]),
  new Set([5, 7, 8]),
  new Set([9, 10, 11]),
];

// Generate arcs data from location combinations
function generateArcsData(): Arc[] {
  const arcs: Arc[] = [];
  
  locationCombinations.forEach(combination => {
    const indices = Array.from(combination);
    const pairs = generatePairs(indices);
    
    pairs.forEach(([startIdx, endIdx]) => {
      const startLocation = locations[startIdx];
      const endLocation = locations[endIdx];
      const arcColor = generateLightHexColor();
      
      // Create bidirectional arcs
      arcs.push({
        startLat: startLocation.lat,
        startLng: startLocation.lng,
        endLat: endLocation.lat,
        endLng: endLocation.lng,
        color: arcColor
      });
      
      arcs.push({
        startLat: endLocation.lat,
        startLng: endLocation.lng,
        endLat: startLocation.lat,
        endLng: startLocation.lng,
        color: arcColor
      });
    });
  });
  
  return arcs;
}

const arcs = generateArcsData();

export const LocationsPage = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Globe2 className="w-8 h-8 text-indigo-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Presence</h2>
          <p className="text-gray-600">Interactive 3D visualization of our locations</p>
        </div>
      </div>

      <InteractiveGlobe points={locations} arcs={arcs}  />
    </>
  );
}
