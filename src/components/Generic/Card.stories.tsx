import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { styles } from '../DesignEnums/MessageType';
import { Paragraph } from '../Typography/Paragraph';

const meta = {
  title: 'UI/Atoms/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example Card',
    children: <Paragraph>This is some content inside the card.</Paragraph>,
  },
};

export const WithCustomClass: Story = {
  args: {
    title: 'Featured Service',
    className: `${styles.ACCENT.backgroundGradient} ${styles.ACCENT.border}`,
    children: (
      <div className="space-y-2">
        <Paragraph className={styles.ACCENT.textDark}>Professional teeth whitening service now available!</Paragraph>
        <Paragraph size='SMALL' className={`${styles.ACCENT.text}`}>Schedule your appointment today.</Paragraph>
      </div>
    ),
  },
};
