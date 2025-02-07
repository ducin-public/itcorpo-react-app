import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { officesListQuery } from '../../../api/OfficeQueries';

import { OfficeCard } from './OfficeCard';
import { Spinner } from '../../../components/Generic/Spinner';
import { Button } from '../../../components/Generic/Button';
import { OfficeSearchBar } from '../search/OfficeSearchBar';
import { OfficeSearchFilters } from '../search/OfficeSearchFilters';
import { H1 } from '../../../components/Typography/Headings';
import { Text } from '../../../components/Typography/Text';
import { FlexText } from '../../../components/Typography/FlexText';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';

export const OfficeList = () => {
  const navigate = useNavigate();
  
  const [searchState, setSearchState] = useState<OfficeSearchFilters>({
    searchPhrase: '',
    selectedCountries: [],
    selectedAmenities: [],
    amenitiesFiltering: 'ANY'
  });

  const { searchPhrase, selectedCountries, selectedAmenities } = searchState;

  const { data: offices, isFetching } = useQuery({
    ...officesListQuery({
      countries: searchState.selectedCountries.join(','),
      amenities: searchState.selectedAmenities.join(','),
      amenitiesFiltering: searchState.amenitiesFiltering,
      phrase: searchState.searchPhrase
    }),
    placeholderData: (prev) => prev
  });

  const handleSearchUpdate = (updates: Partial<OfficeSearchFilters>) => {
    setSearchState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="px-2 py-2 relative">
      <div className="flex justify-between items-center mb-6">
        <FlexText>
          <H1 className='mb-0'>Offices</H1>
          {offices && <Text>({offices.length} results)</Text>}
        </FlexText>
        <Button
          icon={Plus}
          onClick={() => navigate('/offices/new')}
          className="flex items-center space-x-2"
        >
          <span>Add Office</span>
        </Button>
      </div>

      <div className="mb-6">
        <OfficeSearchBar
          searchPhrase={searchPhrase}
          onSearchChange={(searchPhrase) => handleSearchUpdate({ searchPhrase })}
          selectedCountries={selectedCountries}
          onCountriesChange={(selectedCountries) => handleSearchUpdate({ selectedCountries })}
          selectedAmenities={selectedAmenities}
          onAmenitiesChange={(selectedAmenities) => handleSearchUpdate({ selectedAmenities })}
          amenitiesFiltering={searchState.amenitiesFiltering}
          onAmenitiesFilteringChange={(amenitiesFiltering) => handleSearchUpdate({ amenitiesFiltering })}
        />
      </div>

      <div className="relative min-h-[200px]">
        <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isFetching ? 'pointer-events-none' : ''}`}>
            {offices?.map((office) => (
              <OfficeCard
                key={office.city}
                office={office}
                onView={() => navigate(`/offices/${office.code}`)}
                onEdit={() => navigate(`/offices/${office.code}/edit`)}
              />
            ))}
          </div>
        </SpinnerOverlay>
      </div>
    </div>
  );
};