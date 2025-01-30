import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonChoice } from './ButtonChoice';
import { getArgsPropsOrDie } from '../story-utils';

const meta = {
    title: 'UI/Molecules/ButtonChoice',
    component: ButtonChoice,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        options: [
            { value: 'ANY', label: 'Any' },
            { value: 'ALL', label: 'All' }
        ],
        value: 'ANY',
        onChange: action('onChange'),
        size: 'MEDIUM',
    },
} satisfies Meta<typeof ButtonChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value || '');
  const options = getArgsPropsOrDie(args, 'options');
    return (
        <ButtonChoice
            {...args}
            options={options}
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
        value: 'ALL',
    },
};

export const WithStates: Story = {
    render: Template,
    args: {
        options: [
            { value: 'PLANNING', label: 'Planning' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'TESTING', label: 'Testing' },
            { value: 'COMPLETED', label: 'Completed' },
        ],
    },
};

export const WithSizes: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(args?.value ?? args?.options[0].value);
        
        return (
            <div className="flex flex-col gap-4">
                {(['SMALL', 'MEDIUM', 'LARGE'] as const).map((size) => (
                    <ButtonChoice 
                        key={size}
                        {...args}
                        size={size}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            action('onChange')(newValue);
                        }}
                    />
                ))}
            </div>
        );
    },
    args: {
        options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'REJECTED', label: 'Rejected' },
        ],
        value: "APPROVED",
    },
};

export const Disabled: Story = {
    render: Template,
    args: {
        disabled: true,
    },
};
