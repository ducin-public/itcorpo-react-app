import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonChoice } from './ButtonChoice';

const meta = {
    title: 'UI/Forms/ButtonChoice',
    component: ButtonChoice,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ButtonChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterToggle: Story = {
    args: {
        options: [
            { value: "ANY", label: 'Any' },
            { value: "ALL", label: 'All' }
        ],
        value: "ANY",
        onChange: action('onChange'),
    },
};

export const YesNoMaybeToggle: Story = {
    args: {
        options: [
            { value: 'YES', label: 'Yes' },
            { value: 'NO', label: 'No' },
            { value: 'MAYBE', label: 'Maybe' }
        ],
        value: 'YES',
        onChange: action('onChange'),
    },
};

export const Small: Story = {
    args: {
        options: [
            { value: 'PLANNING', label: 'Planning' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'TESTING', label: 'Testing' },
            { value: 'COMPLETED', label: 'Completed' }
        ],
        value: 'IN_PROGRESS',
        size: 'SMALL',
        onChange: action('onChange'),
    },
};

export const Medium: Story = {
    args: {
        options: [
            { value: 'PLANNING', label: 'Planning' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'TESTING', label: 'Testing' },
            { value: 'COMPLETED', label: 'Completed' }
        ],
        value: 'IN_PROGRESS',
        size: 'MEDIUM',
        onChange: action('onChange'),
    },
};

export const Large: Story = {
    args: {
        options: [
            { value: 'PLANNING', label: 'Planning' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'TESTING', label: 'Testing' },
            { value: 'COMPLETED', label: 'Completed' }
        ],
        value: 'IN_PROGRESS',
        size: 'LARGE',
        onChange: action('onChange'),
    },
};
