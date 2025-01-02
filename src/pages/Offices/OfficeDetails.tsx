import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Spinner } from '../../components/Spinner';
import { formatCurrency } from '../../mock-utils/format';
import { Office } from '../../api/data-contracts';
import { getOffices } from '../../api/OfficeApi';
import { officeImageURL } from './officeImageURL';

export function OfficeDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [offices, setOffices] = useState<Office[]>([]);
  const office = offices.find(o => o.city.toLowerCase() == id);

  useEffect(() => {
    getOffices().then(result => {
      setOffices(result);
      setIsLoading(false);
    })
  }, []);

  if (isLoading) return <Spinner />;
  if (!office) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img
          src={officeImageURL(office)}
          alt={`${office.city}, ${office.country}`}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{office.city}, {office.country}</h1>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Office Details</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Capacity:</span>{' '}
                  <span className="text-gray-900">{office.capacity}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Monthly Cost:</span>{' '}
                  <span className="text-gray-900">{formatCurrency(office.monthlyRental)}</span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{office.address}</p>
                <p>
                  {office.city}, {office.estate.owner} {office.estate.phone}
                </p>
                <p>{office.country}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {office.amenities.map((amenity) => (
                <span
                  key={amenity.code}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}