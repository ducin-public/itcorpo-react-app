import React from 'react';
import { Edit, Users, DollarSign, Eye } from 'lucide-react';
import { formatCurrency } from '../../mock-utils/format';
import { Office } from '../../api/data-contracts';
import { officeImageURL } from './officeImageURL';
import { styles } from '../../components/DesignEnums/MessageType';

export function OfficeCard({
  office,
  onView,
  onEdit,
}: {
  office: Office;
  onView: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={officeImageURL(office)}
        alt={`${office.city}, ${office.country}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {office.city}, {office.country}
            </h3>
            <p className="text-sm text-gray-600">
              {office.address}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onView}
              className={`text-gray-400 ${styles.ACCENT.textHover}`}
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={onEdit}
              className={`text-gray-400 ${styles.ACCENT.textHover}`}
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-1" />
            <span className="text-sm">Capacity: {office.capacity}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-5 w-5 mr-1" />
            <span className="text-sm">
              Monthly: {formatCurrency(office.monthlyRental)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {office.amenities.map((amenity) => (
            <span
              key={amenity.code}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {amenity.name}
            </span>
          ))}
        </div>

        <button
          onClick={onView}
          className={`mt-4 text-sm font-medium ${styles.ACCENT.text} ${styles.ACCENT.textHover}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
}