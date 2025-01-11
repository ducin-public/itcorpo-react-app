import type { BenefitCategory } from '../../contract-types/data-contracts';
import { Chip } from '../../components/Generic/Chip';
import { VariantType } from '../../components/DesignLanguage';

const categoryStyles: Record<BenefitCategory, VariantType> = {
  'HEALTHCARE': 'UPDATE',
  'CULTURE_RECREATION': 'SUCCESS',
  'LUNCH_FOOD': 'ACCENT',
  'SPORT_WELLNESS': 'WARNING'
};

interface BenefitServiceChipProps {
  category: BenefitCategory;
  name: string;
}

export const BenefitServiceChip = ({ category, name }: BenefitServiceChipProps) => {
  const variantType = categoryStyles[category];
  
  return (
    <Chip variant={variantType} size='SMALL'>
      {name}
    </Chip>
  );
};
