import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '../../components/Generic/Spinner';
import { OfficeCard } from './OfficeCard';
import type { Office } from '../../api/data-contracts';
import { getOffices } from '../../api/OfficeApi.axios';
import { Button } from '../../components/Generic/Button';
import { OfficeSearchBar } from './OfficeSearchBar';

export const OfficeList = () => {
  const navigate = useNavigate();
  
  const [searchPhrase, setSearchPhrase] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const { data: offices = [], isLoading, isFetching } = useQuery<Office[]>({
    queryKey: ['offices', searchPhrase, selectedCountries, selectedAmenities],
    queryFn: () => getOffices()
    // queryFn: () => getOffices({
    //   search: searchPhrase,
    //   countries: selectedCountries,
    //   amenities: selectedAmenities
    // })
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="relative">
      {isFetching && <Spinner size='LARGE' layout='OVERLAY' />}
      
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
          onSearchChange={setSearchPhrase}
          selectedCountries={selectedCountries}
          onCountriesChange={setSelectedCountries}
          selectedAmenities={selectedAmenities}
          onAmenitiesChange={setSelectedAmenities}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
};