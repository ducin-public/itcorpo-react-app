import type { Meta, StoryObj } from '@storybook/react';
import { Tree, type TreeNode } from './Tree';
import { styles } from '../DesignEnums/MessageType';

const meta: Meta<typeof Tree> = {
  title: 'UI/Molecules/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tree>;

const sampleData: TreeNode[] = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child 1.1',
        children: [
          { id: '1-1-1', label: 'Grandchild 1.1.1' },
          { id: '1-1-2', label: 'Grandchild 1.1.2' },
        ],
      },
      { id: '1-2', label: 'Child 1.2' },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    children: [
      { id: '2-1', label: 'Child 2.1' },
      { id: '2-2', label: 'Child 2.2' },
    ],
  },
  {
    id: '3',
    label: 'Root Node 3',
  },
];

const geographicalData: TreeNode[] = [
  {
    id: 'uk',
    label: 'United Kingdom',
    children: [
      {
        id: 'eng',
        label: 'England',
        children: [
          {
            id: 'london',
            label: 'Greater London',
            children: [
              { id: 'westminster', label: 'Westminster' },
              { id: 'camden', label: 'Camden' },
              { id: 'greenwich', label: 'Greenwich' }
            ]
          },
          {
            id: 'manchester',
            label: 'Greater Manchester',
            children: [
              { id: 'mcity', label: 'Manchester City' },
              { id: 'bolton', label: 'Bolton' },
              { id: 'stockport', label: 'Stockport' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'pl',
    label: 'Poland',
    children: [
      {
        id: 'mazowieckie',
        label: 'Mazowieckie',
        children: [
          {
            id: 'warsaw',
            label: 'Warsaw Region',
            children: [
              { id: 'waw-center', label: 'Warsaw' },
              { id: 'piaseczno', label: 'Piaseczno' }
            ]
          }
        ]
      },
      {
        id: 'malopolskie',
        label: 'Małopolskie',
        children: [
          {
            id: 'krakow',
            label: 'Kraków Region',
            children: [
              { id: 'krk-center', label: 'Kraków' },
              { id: 'wieliczka', label: 'Wieliczka' }
            ]
          }
        ]
      }
    ]
  }
];

const complexLabelData: TreeNode[] = [
  {
    id: '1',
    label: (
      <div className="flex items-center gap-2">
        <span className="font-bold">Enterprise IT Portfolio</span>
        <span className={`text-xs ${styles.ACCENT.background} px-2 py-0.5 rounded-full`}>Q4 2023</span>
      </div>
    ),
    children: [
      {
        id: 'client-apps',
        label: (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Client Applications</span>
            <span className="text-xs text-gray-500">(25 developers)</span>
          </div>
        ),
        children: [
          {
            id: 'web-apps',
            label: (
              <div className="flex items-center gap-2">
                <span className="font-medium">Web Applications</span>
                <span className={`text-xs ${styles.SUCCESS.background} px-2 py-0.5 rounded-full`}>Stable</span>
              </div>
            ),
            children: [
              {
                id: 'customer-portal',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Customer Portal v2.0</span>
                    <span className="text-xs text-gray-500">(React, TypeScript)</span>
                  </div>
                )
              },
              {
                id: 'admin-dashboard',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Admin Dashboard</span>
                    <span className="text-xs text-gray-500">(Vue.js, Vite)</span>
                  </div>
                )
              },
              {
                id: 'analytics-platform',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Analytics Platform</span>
                    <span className={`text-xs ${styles.WARNING.background} px-2 py-0.5 rounded-full`}>Beta</span>
                  </div>
                )
              }
            ]
          },
          {
            id: 'mobile-apps',
            label: (
              <div className="flex items-center gap-2">
                <span className="font-medium">Mobile Applications</span>
                <span className={`text-xs ${styles.UPDATE.background} px-2 py-0.5 rounded-full`}>In Development</span>
              </div>
            ),
            children: [
              {
                id: 'ios-app',
                label: "iOS App (Swift UI)"
              },
              {
                id: 'android-app',
                label: "Android App (Kotlin)"
              }
            ]
          }
        ]
      },
      {
        id: 'backend-services',
        label: (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Backend Services</span>
            <span className="text-xs text-gray-500">(18 developers)</span>
          </div>
        ),
        children: [
          {
            id: 'core-services',
            label: "Core Services",
            children: [
              {
                id: 'auth-service',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Authentication Service</span>
                    <span className="text-xs text-gray-500">(Node.js, Express)</span>
                  </div>
                )
              },
              {
                id: 'data-processing',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Data Processing API</span>
                    <span className="text-xs text-gray-500">(Python, FastAPI)</span>
                  </div>
                )
              }
            ]
          },
          {
            id: 'microservices',
            label: "Microservices",
            children: [
              {
                id: 'notification-service',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Notification Service</span>
                    <span className="text-xs text-gray-500">(Go)</span>
                  </div>
                )
              },
              {
                id: 'payment-service',
                label: (
                  <div className="flex items-center gap-2">
                    <span>Payment Processing</span>
                    <span className={`text-xs ${styles.ALERT.background} px-2 py-0.5 rounded-full`}>Critical</span>
                  </div>
                )
              }
            ]
          }
        ]
      },
      {
        id: 'devops',
        label: (
          <div className="flex items-center gap-2">
            <span className="font-semibold">DevOps & Infrastructure</span>
            <span className="text-xs text-gray-500">(8 engineers)</span>
          </div>
        ),
        children: [
          {
            id: 'monitoring',
            label: "Monitoring & Alerting",
            children: [
              {
                id: 'metrics',
                label: "Metrics Platform (Prometheus)"
              },
              {
                id: 'logging',
                label: "Logging System (ELK Stack)"
              }
            ]
          },
          {
            id: 'deployment',
            label: "Deployment Pipeline",
            children: [
              {
                id: 'ci-cd',
                label: "CI/CD (Jenkins, GitHub Actions)"
              },
              {
                id: 'kubernetes',
                label: "Kubernetes Clusters"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const SingleNode: Story = {
  args: {
    data: [{ id: '1', label: 'Single Node' }],
  },
};

export const GeographicalHierarchy: Story = {
  args: {
    data: geographicalData,
  },
};

export const WithComplexLabels: Story = {
  args: {
    data: complexLabelData,
  },
};
