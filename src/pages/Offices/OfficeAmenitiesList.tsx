import { ChipList } from '../../components/Generic/ChipList';

export type OfficeAmenitiesListProps = {
  amenities: string[];
  className?: string;
};

export const OfficeAmenitiesList = ({ amenities, className }: OfficeAmenitiesListProps) => {
  return (
    <ChipList
      items={amenities}
      variant="DEFAULT"
      fill='OUTLINED'
      size="SMALL"
      className={className}
    />
  );
};
