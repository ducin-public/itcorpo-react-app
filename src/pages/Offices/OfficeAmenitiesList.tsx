import React from 'react';
import { ChipList } from '../../components/Generic/ChipList';

export type OfficeAmenitiesListProps = {
  amenities: string[];
  className?: string;
};

export const OfficeAmenitiesList = ({ amenities, className }: OfficeAmenitiesListProps) => {
  return (
    <ChipList
      items={amenities}
      messageType="DEFAULT"
      size="SMALL"
      className={className}
    />
  );
};
