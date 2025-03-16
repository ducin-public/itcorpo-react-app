import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notifications } from './Notifications';
import { NotificationProvider, useNotifications } from './NotificationContext';
import { Button } from '../Generic/Button';
import type { Notification } from './NotificationContext';

// Demo providers for stories
interface NotificationsDemoProviderProps {
  children: React.ReactNode;
  initialNotifications?: Notification[]
}

const NotificationsDemoProvider = ({ children, initialNotifications = [] }: NotificationsDemoProviderProps) => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add initial notifications on mount
    initialNotifications.forEach(notification => {
      addNotification(notification.type, notification.message);
    });
  }, []); // Only on mount

  return <>{children}</>;
};

const meta = {
  title: 'UI/Notifications/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NotificationProvider>
        {Story()}
      </NotificationProvider>
    ),
  ],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof Notifications>;

// Interactive demo component
const NotificationDemo = () => {
  const { addNotification } = useNotifications();

  const notifications = [
    {
      type: 'error' as const,
      message: 'Failed to deploy project to production environment',
    },
    {
      type: 'warning' as const,
      message: 'Project budget is reaching its limit',
    },
    {
      type: 'info' as const,
      message: 'New team member John Smith joined the Frontend Development team',
    },
    {
      type: 'notice' as const,
      message: 'Successfully merged feature branch into main',
    },
    {
      type: 'error' as const,
      message: 'Unable to connect to the deployment server. Please check your VPN connection and try again. If the problem persists, contact the DevOps team.',
    },
    {
      type: 'info' as const,
      message: 'Daily standup meeting starts in 5 minutes',
    },
  ];

  const addRandomNotification = () => {
    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    addNotification(notification.type, notification.message);
  };

  return (
    <div className="fixed bottom-4 left-4">
      <Button onClick={addRandomNotification}>
        Add Random Notification
      </Button>
    </div>
  );
};

export const ErrorNotification: Story = {
  decorators: [
    (Story) => (
      <NotificationsDemoProvider initialNotifications={[{
        id: '1',
        type: 'error',
        message: 'Failed to deploy project to production environment',
      }]}>
        {Story()}
      </NotificationsDemoProvider>
    ),
  ],
};

export const WarningNotification: Story = {
  decorators: [
    (Story) => (
      <NotificationsDemoProvider initialNotifications={[{
        id: '1',
        type: 'warning',
        message: 'Project budget is reaching its limit',
      }]}>
        {Story()}
      </NotificationsDemoProvider>
    ),
  ],
};

export const InfoNotification: Story = {
  decorators: [
    (Story) => (
      <NotificationsDemoProvider initialNotifications={[{
        id: '1',
        type: 'info',
        message: 'New team member John Smith joined the Frontend Development team',
      }]}>
        {Story()}
      </NotificationsDemoProvider>
    ),
  ],
};

export const SuccessNotification: Story = {
  decorators: [
    (Story) => (
      <NotificationsDemoProvider initialNotifications={[{
        id: '1',
        type: 'notice',
        message: 'Successfully merged feature branch into main',
      }]}>
        {Story()}
      </NotificationsDemoProvider>
    ),
  ],
};

export const MultipleNotifications: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  decorators: [
    (Story) => (
      <NotificationsDemoProvider initialNotifications={[
        {
          id: '1',
          type: 'error',
          message: 'Build failed',
        },
        {
          id: '2',
          type: 'warning',
          message: 'The project is approaching its maximum allocated cloud resources. Consider optimizing or requesting an increase in resource limits.',
        },
        {
          id: '3',
          type: 'info',
          message: 'Sprint planning meeting at 10:00 AM',
        },
        {
          id: '4',
          type: 'notice',
          message: 'Code review completed: PR-1234 "Add user authentication"',
        },
      ]}>
        <NotificationDemo />
        {Story()}
      </NotificationsDemoProvider>
    ),
  ],
};
