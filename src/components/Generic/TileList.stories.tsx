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
        variant: 'WARNING'
      },
      {
        title: 'Digital Transformation',
        description: 'End-to-end digital transformation of business processes',
        link: '/projects/transformation',
        variant: 'SUCCESS'
      },
      {
        title: 'Agile Development',
        description: 'Iterative software development using Scrum methodology',
        link: '/projects/agile',
        variant: 'DEFAULT'
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
        variant: 'DEFAULT'
      },
      {
        title: 'DevOps Engineering',
        description: 'CI/CD pipeline optimization and infrastructure automation',
        link: '/specialties/devops',
        variant: 'DEFAULT'
      },
      {
        title: 'Security Engineering',
        description: 'Implementation of cybersecurity measures and protocols',
        link: '/specialties/security',
        variant: 'DEFAULT'
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
        variant: 'UPDATE'
      },
      {
        title: 'Technical Support',
        description: 'Enterprise-level IT support and maintenance',
        variant: 'UPDATE'
      },
      {
        title: 'Consulting Services',
        description: 'Expert technical consulting and architecture review',
        variant: 'UPDATE'
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
        variant: 'ALERT'
      },
      {
        title: 'Security Protocol Update',
        description: 'Mandatory security measure updates for all projects',
        variant: 'ALERT'
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
        variant: 'ALERT'
      },
      {
        title: 'New Framework Release',
        description: 'Latest version of our development framework available',
        variant: 'UPDATE'
      },
      {
        title: 'Resource Planning',
        description: 'Updated resource allocation for Q4 projects',
        variant: 'DEFAULT'
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
        variant: 'DEFAULT'
      },
      {
        title: 'Deployment Success',
        description: 'Production deployment completed successfully',
        link: '/deployments/latest',
        variant: 'SUCCESS'
      },
      {
        title: 'Performance Issues',
        description: 'Database optimization required for core services',
        link: '/issues/performance',
        variant: 'WARNING'
      },
      {
        title: 'Security Breach',
        description: 'Immediate action required: unauthorized access detected',
        link: '/security/alerts',
        variant: 'ALERT'
      },
      {
        title: 'New Feature Release',
        description: 'Introducing advanced monitoring dashboard',
        link: '/releases/monitoring',
        variant: 'UPDATE'
      }
    ]
  }
};
