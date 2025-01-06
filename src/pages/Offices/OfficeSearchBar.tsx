import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

import { MultiSelect } from '../../components/Forms/MultiSelect';
import { TextInput } from '../../components/Forms/TextInput';
import type { OfficeAmenity, Geo } from '../../api/data-contracts';
import { getOfficeAmenities } from '../../api/OfficeApi.axios';
import { getGeo } from '../../api/GeoApi.axios';
import { ExpandableSearchBar } from '../../components/Generic/ExpandableSearchBar';

export type OfficeSearchBarProps = {
  onSearchChange: (search: string) => void;
  onCountriesChange: (countries: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  selectedCountries: string[];
  selectedAmenities: string[];
  searchPhrase: string;
};

export const OfficeSearchBar = ({
  onSearchChange,
  onCountriesChange,
  onAmenitiesChange,
  selectedCountries,
  selectedAmenities,
  searchPhrase,
}: OfficeSearchBarProps) => {
  const { data: geoData } = useQuery<Geo>({
    queryKey: ['geo'],
    queryFn: getGeo
  });

  const { data: amenities = [] } = useQuery<OfficeAmenity[]>({
    queryKey: ['amenities'],
    queryFn: getOfficeAmenities
  });

  return (
    <ExpandableSearchBar>
      <div className="flex gap-4 mt-4">
        <TextInput
            label="Search phrase"
            placeholder="Search offices..."
            size={30}
            value={searchPhrase}
            onChange={onSearchChange}
        />
        <MultiSelect
            label="Countries"
            options={geoData ? Object.entries(geoData).map(([code, name]) => ({
            label: name,
            value: code
            })) : []}
            value={selectedCountries}
            onChange={onCountriesChange}
        />
        <MultiSelect
            label="Amenities"
            options={amenities.map(amenity => ({
            label: amenity.name,
            value: amenity.code
            }))}
            value={selectedAmenities}
            onChange={onAmenitiesChange}
        />
      </div>
    </ExpandableSearchBar>
  );
};
