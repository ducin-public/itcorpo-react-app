import { ChipList } from '../../components/Generic/ChipList';
import { Text } from '../../components/Typography/Text';

interface EmployeeSkillsProps {
  skills: string[];
  expanded?: boolean;
  collapseAbove?: number;
}

export function EmployeeSkills({ 
  skills, 
  expanded = true,
  collapseAbove = 5 
}: EmployeeSkillsProps) {
  const visibleSkills = expanded ? skills : skills.slice(0, collapseAbove);
  const remainingCount = skills.length - collapseAbove;

  return (
    <div className="flex items-center gap-2">
      <ChipList
        items={visibleSkills}
        variant="SECONDARY"
        size="SMALL"
      />
      {!expanded && remainingCount > 0 && (
        <Text size="SMALL" messageType='DEFAULT'>
          +{remainingCount} more
        </Text>
      )}
    </div>
  );
}
