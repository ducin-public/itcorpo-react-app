import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Switch } from './Switch';

const meta = {
  title: 'UI/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Enable Feature',
    checked: false,
    onChange: action('onChange'),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

const Template = (args: Story['args']) => {
  const [checked, setChecked] = useState(args?.checked ?? false);
  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(newValue) => {
        setChecked(newValue);
        action('onChange')(newValue);
      }}
    />
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    checked: true,
    label: 'Auto-deploy to staging',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: 'Production deployment (requires approval)',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  render: Template,
  args: {
    label: 'System maintenance mode',
    checked: true,
    disabled: true,
  },
};
