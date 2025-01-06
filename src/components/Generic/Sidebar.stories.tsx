import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sidebar, SidebarScreen } from './Sidebar';
import { Paragraph } from '../Typography/Paragraph';
import { TextInput } from '../Forms/TextInput';
import { Button } from '../Generic/Button';
import { H2 } from '../Typography/Headings';

const meta = {
  title: 'UI/Layout/Sidebar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A sliding sidebar component that can contain any content and can be closed via a button or clicking outside.'
      }
    }
  }
} satisfies Meta<typeof SidebarScreen>;

export default meta;

// SidebarScreen Stories
export const BasicSidebarScreen: StoryObj<typeof SidebarScreen> = {
  render: () => (
    <SidebarScreen isOpen={true} onClose={action('sidebar-closed')}>
      <H2 className="mb-4">Project Details</H2>
      <Paragraph>
        This is a sample project description that demonstrates the sidebar content.
      </Paragraph>
    </SidebarScreen>
  )
};

export const SidebarScreenWithForm: StoryObj<typeof SidebarScreen> = {
  render: () => (
    <SidebarScreen isOpen={true} onClose={action('sidebar-closed')}>
      <H2 className="mb-4">Edit Technology Stack</H2>
      <form className="space-y-4">
        <TextInput
          value=''
          label="Technology Name"
          placeholder="Enter technology name"
          onChange={action('technology-changed')}
          />
        <TextInput
          value=''
          label="Version"
          placeholder="Enter version"
          onChange={action('version-changed')}
        />
      </form>
    </SidebarScreen>
  )
};

// Stateful Sidebar Stories
export const StatefulSidebar: StoryObj<typeof Sidebar> = {
  render: () => (
    <Sidebar
      trigger={<Button>Open Sidebar</Button>}
    >
      <H2 className="mb-4">Project Technologies</H2>
      <Paragraph>
        Click the button to toggle the sidebar. This version maintains its own state.
      </Paragraph>
    </Sidebar>
  )
};

export const StatefulSidebarWithForm: StoryObj<typeof Sidebar> = {
  render: () => (
    <Sidebar
      trigger={<Button>Edit Project</Button>}
    >
      <H2 className="mb-4">Edit Project Details</H2>
      <form className="space-y-4">
        <TextInput
          value=''
          label="Project Name"
          placeholder="Enter project name"
          onChange={action('project-name-changed')}
        />
        <TextInput
          value=''
          label="Project Code"
          placeholder="Enter project code"
          onChange={action('project-code-changed')}
        />
      </form>
    </Sidebar>
  )
};
