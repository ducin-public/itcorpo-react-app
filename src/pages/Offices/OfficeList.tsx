import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../components/Generic/Spinner';
import { OfficeCard } from './OfficeCard';
import { getOffices } from '../../api/OfficeApi.axios';
import { Button } from '../../components/Generic/Button';
import { OfficeSearchBar } from './OfficeSearchBar';

export interface OfficeSearchState {
  searchPhrase: string;
  selectedCountries: string[];
  selectedAmenities: string[];
}

export const OfficeList = () => {
  const navigate = useNavigate();
  
  const [searchState, setSearchState] = useState<OfficeSearchState>({
    searchPhrase: '',
    selectedCountries: [],
    selectedAmenities: []
  });

  const { searchPhrase, selectedCountries, selectedAmenities } = searchState;

  const { data: offices = [], isLoading, isFetching } = useQuery({
    queryKey: ['offices', searchState] as const,
    queryFn: () => getOffices({
      countries: searchState.selectedCountries.join(','),
      amenities: searchState.selectedAmenities.join(','),
      phrase: searchState.searchPhrase
    })
  });

  const handleSearchUpdate = (updates: Partial<OfficeSearchState>) => {
    setSearchState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="px-2 py-2 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Offices</h1>
        <Button
          onClick={() => navigate('/offices/new')}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
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
        />
      </div>

      <div className="relative min-h-[200px]">
        {isFetching && (
          <Spinner size='LARGE' layout='OVERLAY' />
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isFetching ? 'pointer-events-none' : ''}`}>
          {offices.map((office) => (
            <OfficeCard
              key={office.city}
              office={office}
              onView={() => navigate(`/offices/${office.city.toLowerCase()}`)}
              onEdit={() => navigate(`/offices/${office.city.toLowerCase()}/edit`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};