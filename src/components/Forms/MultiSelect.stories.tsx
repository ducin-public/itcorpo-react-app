import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MultiSelect } from './MultiSelect';
import { getArgsPropsOrDie } from '../story-utils';
import { ValidationError } from './ValidationError';

const projectTechnologies = {
  'REACT': 'React',
  'NODEJS': 'Node.js',
  'TYPESCRIPT': 'TypeScript',
  'PYTHON': 'Python',
  'JAVA': 'Java',
};

const meta = {
  title: 'UI/Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Project Technologies',
    options: projectTechnologies,
    placeholder: 'Select technologies...',
    onChange: action('onChange'),
    value: [],
  },
  decorators: [(Story) => <div className="w-[300px]">{Story()}</div>],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState<string[]>(args?.value ?? []);
  const label = getArgsPropsOrDie(args, 'label');
  const options = getArgsPropsOrDie(args, 'options');

  return (
    <>
      <MultiSelect
        {...args}
        label={label}
        options={options}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          action('onChange')(newValue);
        }}
      />
      {args?.error && <ValidationError>At least one option must be selected</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: ['REACT', 'TYPESCRIPT'],
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'Choose required technologies...',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    error: true,
    value: [],
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    value: [],
  },
};

export const DisabledWithValue: Story = {
  render: Template,
  args: {
    value: ['REACT', 'TYPESCRIPT'],
    disabled: true,
  },
};
