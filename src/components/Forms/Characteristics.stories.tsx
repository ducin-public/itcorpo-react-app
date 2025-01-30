import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { MultiSelect } from './MultiSelect';
import { Dropdown } from './Dropdown';
import { CardInput } from './CardInput';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { PasswordInput } from './PasswordInput';
import { PhoneInput } from './PhoneInput';
import { NumberRangeInput } from './NumberRangeInput';
import { Autocomplete } from './Autocomplete';
import { getArgsPropsOrDie } from '../story-utils';

type __Props__ = { disabled: boolean, error: boolean, withValue: boolean };
const meta: Meta<__Props__> = {
  title: 'UI/Forms/📚 Index',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Sets of form controls for capturing common characteristics.
        
💡 Controls addon allows to toggle state of \`disabled\`, \`error\` and \`withValue\`.
        `
      }
    }
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    },
    withValue: {
      control: 'boolean'
    }
  },
  args: {
    disabled: false,
    error: false,
    withValue: false
  }
};

export default meta;

type Story = StoryObj<React.FC<__Props__>>;

const Template = (args: Story['args']) => {
  const disabled = getArgsPropsOrDie(args, 'disabled');
  const error = getArgsPropsOrDie(args, 'error');
  const withValue = getArgsPropsOrDie(args, 'withValue');
  return <>
    <TextInput
      value={withValue ? 'Project Name' : ''}
      label="Text Input"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <Autocomplete
      value={withValue ? 'Web Development' : ''}
      label="Autocomplete"
      options={[
        { id: '1', label: 'Web Development' },
        { id: '2', label: 'Mobile App Development' },
        { id: '3', label: 'Cloud Infrastructure' },
        { id: '4', label: 'Machine Learning' }
      ]}
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <Dropdown
      value={withValue ? 'Web' : ''}
      label="Dropdown"
      options={{ Web: 'Web Development Project', Mobile: 'Mobile App Development', Cloud: 'Cloud Infrastructure', ML: 'Machine Learning Solution' }}
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <MultiSelect
      value={withValue ? ['Web', 'Cloud'] : []}
      label="Multi Select"
      options={{ Web: 'Web Development', Cloud: 'Cloud Infrastructure', ML: 'Machine Learning' }}
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <NumberRangeInput
      value={withValue ? { from: 10, to: 100 } : { from: 0, to: 0 }}
      label="Number Range Input"
      onChange={action('changed')}
      prefix='$'
      suffix='/h'
      errorFrom={error}
      errorTo={error}
      disabled={disabled}
    />
    <CardInput
      layout='SEPARATE'
      cardNumber={withValue ? '1234 5678 9012 3456' : ''}
      expiryDate={withValue ? '12/34' : ''}
      cvv={withValue ? '123' : ''}
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <CardInput
      layout='STACKED'
      cardNumber={withValue ? '1234 5678 9012 3456' : ''}
      expiryDate={withValue ? '12/34' : ''}
      cvv={withValue ? '123' : ''}
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <PasswordInput
      value={withValue ? 'password' : ''}
      label="Password Input"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <PhoneInput
      value={withValue ? '123456789' : ''}
      label="Phone Input"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <TextArea
      value={withValue ? 'This project is a cloud-based backend system that uses a microservices architecture. The system is designed to be scalable and fault-tolerant, with each microservice responsible for a specific business domain. The system is built using AWS services, including Lambda, API Gateway, DynamoDB, and S3. The system is designed to be event-driven, with each microservice communicating via SNS and SQS. The system is designed to be secure, with each microservice having its own IAM role and policy. The system is designed to be monitored, with each microservice emitting metrics to CloudWatch. The system is designed to be tested, with each microservice having its own unit tests and integration tests. The system is designed to be deployed using AWS CDK, with each microservice having its own CDK stack. The system is designed to be documented, with each microservice having its own README.md file.' : ''}
      label="Text Area"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <Checkbox
      id="checkbox"
      checked={withValue}
      label="Checkbox"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
    <Radio
      id='radio'
      name='radio'
      checked={withValue}
      label="Radio"
      value="MEDIUM"
      onChange={action('changed')}
      error={error}
      disabled={disabled}
    />
  </>
}

export const AllEmpty: Story = {
  render: Template,
}

export const AllWithValue: Story = {
  render: Template,
  args: {
    withValue: true
  }
}

export const AllDisabled: Story = {
  render: Template,
  args: {
    disabled: true
  }
}

export const AllDisabledWithValue: Story = {
  render: Template,
  args: {
    disabled: true,
    withValue: true
  }
}

export const AllError: Story = {
  render: Template,
  args: {
    error: true
  }
}

export const AllErrorWithValue: Story = {
  render: Template,
  args: {
    error: true,
    withValue: true
  }
}
