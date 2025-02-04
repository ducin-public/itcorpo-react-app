import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { officeDetailsQuery } from '../../../api/OfficeQueries';

import { Spinner } from '../../../components/Generic/Spinner';
import { officeImageURL } from '../officeImageURL';
import { formatCurrency } from '../../../contexts/CurrencyContext';
import { OfficeAmenitiesList } from '../OfficeAmenitiesList';

export function OfficeDetails() {
  const { code } = useParams();
  if (!code) {
    throw new Error('Office code is required in the URL');
  }

  const { data: office, isLoading } = useQuery(officeDetailsQuery(code));

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
                  {office.city}, {office.estateOwner.name} {office.estateOwner.phone}
                </p>
                <p>{office.country}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
            <OfficeAmenitiesList amenities={office.amenities} />
          </div>
        </div>
      </div>
    </div>
  );
}
