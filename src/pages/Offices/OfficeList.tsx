import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Spinner } from '../../components/Generic/Spinner';
import { OfficeCard } from './OfficeCard';
import { Office } from '../../api/data-contracts';
import { getOffices } from '../../api/OfficeApi.axios';
import { Button } from '../../components/Generic/Button';

export function OfficeList() {
  const navigate = useNavigate();
  
  const [offices, setOffices] = useState<Office[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getOffices()
      .then((offices) => {
        setOffices(offices)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <Spinner />;

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offices?.map((office) => (
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
}