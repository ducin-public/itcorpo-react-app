import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { styles } from '../DesignLanguage';

const meta = {
  title: 'UI/Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    title: 'What development technologies do we use?',
    content: (
      <div className="prose prose-sm">
        <p>Our tech stack includes:</p>
        <ul>
          <li>Frontend: React, TypeScript, Tailwind CSS</li>
          <li>Backend: Node.js, Express, PostgreSQL</li>
          <li>DevOps: Docker, Kubernetes, AWS</li>
          <li>Testing: Jest, Cypress</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'What is our sprint schedule?',
    content: (
      <p>We work in 2-week sprint cycles with planning sessions every other Monday. Daily standups are at 10:00 AM UTC.</p>
    ),
  },
  {
    title: 'How do we handle production deployments?',
    content: (
      <p>We follow a CI/CD pipeline with automated testing. Deployments to production require approval from the tech lead and are typically scheduled during low-traffic hours.</p>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const SingleItem: Story = {
  args: {
    items: [defaultItems[0]],
  },
};

export const WithCustomStyling: Story = {
  args: {
    items: [
      {
        title: (
          <div className={`flex items-center gap-2 ${styles.ACCENT.textDark}`}>
            <span className="font-semibold">Development Environment Status</span>
            <span className={`px-2 py-0.5 text-xs ${styles.ACCENT.background} rounded-full`}>Live</span>
          </div>
        ),
        content: (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Testing Environment</h4>
              <p>CPU Usage: 45%</p>
              <p>Memory: 6.2GB/8GB</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Staging Environment</h4>
              <p>CPU Usage: 32%</p>
              <p>Memory: 4.8GB/8GB</p>
            </div>
          </div>
        ),
      },
      {
        title: (
          <div className={`flex items-center gap-2 ${styles.ACCENT.textDark}`}>
            <span className="font-semibold">On-Call Support</span>
            <span className={styles.ALERT.text}>24/7</span>
          </div>
        ),
        content: (
          <div className="bg-red-50 -m-3 p-3 rounded-b-lg border-t border-red-100">
            <p className={`font-medium mb-2 ${styles.ALERT.text}`}>For production emergencies:</p>
            <p className={styles.ALERT.text}>Contact DevOps Team: +1 (555) 123-4567</p>
            <p className={styles.ALERT.text}>Slack Channel: #prod-incidents</p>
          </div>
        ),
      },
    ],
    className: 'max-w-2xl mx-auto',
  },
};
