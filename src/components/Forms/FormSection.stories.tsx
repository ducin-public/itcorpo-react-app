import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './FormSection';
import { TextInput } from './TextInput';
import { useState } from 'react';

const meta: Meta<typeof FormSection> = {
  title: 'UI/Forms/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Employment Details',
  },
};

export default meta;
type Story = StoryObj<typeof FormSection>;

const EmploymentForm = () => {
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');

    return <>
        <TextInput
            label="Department"
            value={department}
            onChange={setDepartment}
            placeholder="Enter department name"
            required
        />
        <TextInput
            label="Position"
            value={position}
            onChange={setPosition}
            placeholder="Enter position title"
            required
        />
    </>
}

const PersonalInfoForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    return <>
        <TextInput
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            placeholder="Enter first name"
            required
        />
        <TextInput
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            placeholder="Enter last name"
            required
        />
        <TextInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Enter email address"
            type="email"
            required
        />
    </>
}

const SkillsForm = () => {
    const [primarySkill, setPrimarySkill] = useState('');
    const [experience, setExperience] = useState('');

    return <>
        <TextInput
            label="Primary Skill"
            value={primarySkill}
            onChange={setPrimarySkill}
            placeholder="Enter primary skill"
            required
        />
        <TextInput
            label="Years of Experience"
            value={experience}
            onChange={setExperience}
            type="number"
            placeholder="Enter years of experience"
            required
        />
    </>
}

export const Default: Story = {
  args: {
    children: <EmploymentForm />,
  },
};

export const WithCustomSpacing: Story = {
  args: {
    label: 'Personal Information',
    className: 'mb-12',
    children: <PersonalInfoForm />,
  },
};

export const Empty: Story = {
  args: {
    label: 'Additional Information',
    children: <p className="text-gray-500 italic">No additional information provided</p>,
  },
};

export const WithComplexContent: Story = {
  args: {
    label: 'Skills & Expertise',
    children: <SkillsForm />,
    layout: 'GRID'
  },
};

export const GridLayout: Story = {
  args: {
    label: 'Personal Information',
    children: <PersonalInfoForm />,
    layout: 'GRID'
  },
};
