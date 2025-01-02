import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Spinner } from '../../components/Spinner';
import { OfficeCard } from './OfficeCard';
import { Office } from '../../api/data-contracts';
import { getOffices } from '../../api/OfficeApi';

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
        <button
          onClick={() => navigate('/offices/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Office</span>
        </button>
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