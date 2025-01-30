/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { Sidebar } from './Sidebar';
import { Paragraph } from '../Typography/Paragraph';
import { TextInput } from '../Forms/TextInput';
import { Button } from '../Generic/Button';
import { H2 } from '../Typography/Headings';

const meta = {
  title: 'UI/Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A controlled sliding sidebar component that requires explicit state management.'
      }
    }
  }
} satisfies Meta<typeof Sidebar>;

export default meta;

export const Default: StoryObj<typeof Sidebar> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Project Details</Button>
        <Sidebar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          title={<H2>Project Details</H2>}
        >
          <Paragraph>
            A sliding sidebar for displaying supplementary content.
          </Paragraph>
        </Sidebar>
      </div>
    );
  }
};

export const WithForm: StoryObj<typeof Sidebar> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Edit Technology Stack</Button>
        <Sidebar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          title={<H2>Edit Technology Stack</H2>}
        >
          <form className="space-y-4">
            <TextInput
              value=""
              label="Technology Name"
              placeholder="Enter technology name"
              onChange={action('technology-changed')}
            />
            <TextInput
              value=""
              label="Version"
              placeholder="Enter version"
              onChange={action('version-changed')}
            />
            <Button onClick={() => action('save')()}>Save Changes</Button>
          </form>
        </Sidebar>
      </div>
    );
  }
};

export const ProgrammaticControl: StoryObj<typeof Sidebar> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button onClick={() => setIsOpen(true)}>Open</Button>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
          <Button onClick={() => setIsOpen(prev => !prev)}>Toggle</Button>
        </div>
        <Sidebar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          title={<H2>Project Access Management</H2>}
        >
          <Paragraph>
            Example of programmatically controlling the sidebar state.
          </Paragraph>
        </Sidebar>
      </div>
    );
  }
};
