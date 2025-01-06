import type { Meta, StoryObj } from '@storybook/react';
import { TileList } from './TileList';

const meta = {
  title: 'UI/Molecules/TileList',
  component: TileList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TileList>;

export default meta;
type Story = StoryObj<typeof TileList>;

export const ProjectTypes: Story = {
  args: {
    items: [
      {
        title: 'Legacy System Migration',
        description: 'Critical modernization of legacy systems to cloud infrastructure',
        link: '/projects/migration',
        messageType: 'WARNING'
      },
      {
        title: 'Digital Transformation',
        description: 'End-to-end digital transformation of business processes',
        link: '/projects/transformation',
        messageType: 'SUCCESS'
      },
      {
        title: 'Agile Development',
        description: 'Iterative software development using Scrum methodology',
        link: '/projects/agile',
        messageType: 'DEFAULT'
      }
    ]
  }
};

export const TechnicalSpecialties: Story = {
  args: {
    items: [
      {
        title: 'Cloud Architecture',
        description: 'Design and implementation of scalable cloud solutions',
        link: '/specialties/cloud',
        messageType: 'DEFAULT'
      },
      {
        title: 'DevOps Engineering',
        description: 'CI/CD pipeline optimization and infrastructure automation',
        link: '/specialties/devops',
        messageType: 'DEFAULT'
      },
      {
        title: 'Security Engineering',
        description: 'Implementation of cybersecurity measures and protocols',
        link: '/specialties/security',
        messageType: 'DEFAULT'
      }
    ]
  }
};

export const ServicesWithoutLinks: Story = {
  args: {
    items: [
      {
        title: '24/7 System Monitoring',
        description: 'Round-the-clock infrastructure and application monitoring',
        messageType: 'UPDATE'
      },
      {
        title: 'Technical Support',
        description: 'Enterprise-level IT support and maintenance',
        messageType: 'UPDATE'
      },
      {
        title: 'Consulting Services',
        description: 'Expert technical consulting and architecture review',
        messageType: 'UPDATE'
      }
    ]
  }
};

export const Alerts: Story = {
  args: {
    items: [
      {
        title: 'System Maintenance',
        description: 'Planned downtime for system upgrades this weekend',
        messageType: 'ALERT'
      },
      {
        title: 'Security Protocol Update',
        description: 'Mandatory security measure updates for all projects',
        messageType: 'ALERT'
      }
    ]
  }
};

export const MixedServices: Story = {
  args: {
    items: [
      {
        title: 'Server Maintenance',
        description: 'Critical server updates scheduled for deployment',
        messageType: 'ALERT'
      },
      {
        title: 'New Framework Release',
        description: 'Latest version of our development framework available',
        messageType: 'UPDATE'
      },
      {
        title: 'Resource Planning',
        description: 'Updated resource allocation for Q4 projects',
        messageType: 'DEFAULT'
      }
    ]
  }
};

export const All: Story = {
  args: {
    items: [
      {
        title: 'Code Review Process',
        description: 'Standard operating procedure for code reviews',
        link: '/processes/code-review',
        messageType: 'DEFAULT'
      },
      {
        title: 'Deployment Success',
        description: 'Production deployment completed successfully',
        link: '/deployments/latest',
        messageType: 'SUCCESS'
      },
      {
        title: 'Performance Issues',
        description: 'Database optimization required for core services',
        link: '/issues/performance',
        messageType: 'WARNING'
      },
      {
        title: 'Security Breach',
        description: 'Immediate action required: unauthorized access detected',
        link: '/security/alerts',
        messageType: 'ALERT'
      },
      {
        title: 'New Feature Release',
        description: 'Introducing advanced monitoring dashboard',
        link: '/releases/monitoring',
        messageType: 'UPDATE'
      }
    ]
  }
};
