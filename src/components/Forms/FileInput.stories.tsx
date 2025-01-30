import type { Meta, StoryObj } from '@storybook/react';
import { File } from 'lucide-react';
import { FileInput } from './FileInput';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FileInput> = {
  title: 'UI/Forms/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Upload File',
    onChange: action('onChange'),
    fileType: 'OTHER',
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};

export const WithImageThumbnail: Story = {
  args: {
    fileType: 'IMAGE',
    renderThumbnail: (filename) => (
      <img
        src={`https://via.placeholder.com/150?text=${filename}`}
        alt="Preview"
        className="w-full h-full object-cover rounded-lg"
      />
    ),
  },
};

export const WithFileThumbnail: Story = {
  args: {
    fileType: 'OTHER',
    renderThumbnail: (filename) => (
      <div className="flex items-center justify-center p-4">
        <File className="w-8 h-8 text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">
          {filename}
        </span>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    fileType: 'IMAGE',
    fileUrl: 'https://via.placeholder.com/150',
  },
};

export const WithFile: Story = {
  args: {
    fileType: 'OTHER',
    fileUrl: 'example.pdf',
  },
};

export const WithError: Story = {
  args: {
    error: true,
  },
};

export const WithCustomAccept: Story = {
  args: {
    accept: '.pdf,.doc,.docx',
    fileType: 'OTHER',
  },
};
