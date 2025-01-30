import React, { useState } from 'react';
import { ChipList } from '../../components/Generic/ChipList';
import { TextInput } from '../../components/Forms/TextInput';

interface SkillsInputProps {
  onChange: (skills: string[]) => void;
  initialSkills?: string[];
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  onChange,
  initialSkills = [],
  disabled = false,
  error,
  className = '',
}) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      const newSkills = [...skills, inputValue.trim()];
      setSkills(newSkills);
      onChange(newSkills);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (disabled) return;
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    onChange(newSkills);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="w-full max-w-md">
        <TextInput
          label="Skills"
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={(e) => e.key === 'Enter' && !disabled && handleAddSkill()}
          placeholder="Type skill and hit 'Enter' to add"
          disabled={disabled}
          error={Boolean(error)}
        />
      </div>
      <ChipList 
        items={skills} 
        onRemove={handleRemoveSkill}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};
