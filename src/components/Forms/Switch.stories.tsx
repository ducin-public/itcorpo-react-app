import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A toggle switch component that can be used to switch between two states.'
      }
    }
  },
  argTypes: {
    checked: {
      description: 'The current state of the switch',
      control: 'boolean'
    },
    onChange: {
      description: 'Callback function called when the switch state changes'
    },
    disabled: {
      description: 'Whether the switch is disabled',
      control: 'boolean'
    },
    className: {
      description: 'Additional CSS classes to apply to the switch'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    onChange: action('switch toggled'),
    label: 'Enable CI/CD pipeline'
  }
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: action('switch toggled'),
    label: 'Auto-deploy to staging'
  }
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: action('switch toggled'),
    label: 'Production deployment (requires approval)'
  }
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
    onChange: action('switch toggled')
  }
};
