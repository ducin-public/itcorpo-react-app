import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextArea } from './TextArea';

const meta = {
  title: 'UI/Forms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Technical Documentation',
    placeholder: 'Enter technical details...',
    onChange: action('onChange'),
    value: '',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

const Template = (args: Story['args']) => {
  const { label, ...rest } = args!;
  if (!label) throw new Error('Label is required');
  const [value, setValue] = useState(args?.value ?? '');
  return (
    <TextArea
      {...rest}
      label={label}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        action('onChange')(newValue);
      }}
    />
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: 'This project is a cloud-based backend system that uses a microservices architecture. The system is designed to be scalable and fault-tolerant, with each microservice responsible for a specific business domain. The system is built using AWS services, including Lambda, API Gateway, DynamoDB, and S3. The system is designed to be event-driven, with each microservice communicating via SNS and SQS. The system is designed to be secure, with each microservice having its own IAM role and policy. The system is designed to be monitored, with each microservice emitting metrics to CloudWatch. The system is designed to be tested, with each microservice having its own unit tests and integration tests. The system is designed to be deployed using AWS CDK, with each microservice having its own CDK stack. The system is designed to be documented, with each microservice having its own README.md file.', 
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'Describe the technical implementation...',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  render: Template,
  args: {
    value: 'System configuration is managed by DevOps team.',
    disabled: true,
  },
};
