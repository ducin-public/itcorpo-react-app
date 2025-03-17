
import { getOfficeAmenities } from '../../../api/OfficeApi.axios';

import { MultiSelect } from '../../../components/Forms/MultiSelect';
import { TextInput } from '../../../components/Forms/TextInput';
import type { Geo, OfficeAmenity } from '../../../contract-types/data-contracts';
import { ExpandableSearchBar } from '../../../components/Generic/ExpandableSearchBar';
import { FilteringChoice } from '../../../components/Generic/FilteringChoice';
import { useEffect, useState } from 'react';
import { getGeo } from '../../../api/GeoApi.axios';

export type OfficeSearchBarProps = {
  onSearchChange: (search: string) => void;
  onCountriesChange: (countries: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  onAmenitiesFilteringChange: (filtering: 'ANY' | 'ALL') => void;
  selectedCountries: string[];
  selectedAmenities: string[];
  amenitiesFiltering: 'ANY' | 'ALL';
  searchPhrase: string;
};

export const OfficeSearchBar = ({
  onSearchChange,
  onCountriesChange,
  onAmenitiesChange,
  onAmenitiesFilteringChange,
  selectedCountries,
  selectedAmenities,
  amenitiesFiltering,
  searchPhrase,
}: OfficeSearchBarProps) => {
  const [geoData, setGeoData] = useState<Geo>({});
  const [amenities, setAmenities] = useState<OfficeAmenity[]>([]);
  useEffect(() => {
    getGeo().then((geo) => {
      setGeoData(geo);
    });

    getOfficeAmenities().then((amenities) => {
      setAmenities(amenities);
    })
  }, [])

  const amenityOptions = amenities.reduce((acc, amenity) => {
    acc[amenity.code] = amenity.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <ExpandableSearchBar>
      <ExpandableSearchBar.BaseRow>
        <TextInput
          label="Address"
          placeholder="Search offices..."
          size={30}
          value={searchPhrase}
          onChange={onSearchChange}
        />
        <MultiSelect
          label="Countries"
          options={geoData ? geoData : {}}
          placeholder='Select countries...'
          value={selectedCountries}
          onChange={onCountriesChange}
        />
        <MultiSelect
          label="Amenities"
          options={amenityOptions}
          placeholder='Select amenities...'
          value={selectedAmenities}
          onChange={onAmenitiesChange}
        />
        <FilteringChoice
          value={amenitiesFiltering}
          onChange={onAmenitiesFilteringChange}
        />
      </ExpandableSearchBar.BaseRow>
    </ExpandableSearchBar>
  );
};
