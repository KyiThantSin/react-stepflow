import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Step from '../components/Step/Step';

const meta = {
  title: 'Components/Step',
  component: Step,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    active: { control: 'boolean' },
    completed: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    orientation: { 
      control: 'select', 
      options: ['horizontal', 'vertical'] 
    },
  },
  decorators: [
    (Story) => (
      <div className="responsive-container">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Step 1',
    index: 0,
    className: 'wider-step',
  },
};

export const Active: Story = {
  args: {
    label: 'Active Step',
    description: 'This is the current step',
    index: 0,
    active: true,
    className: 'wider-step',
  },
};

export const Completed: Story = {
  args: {
    label: 'Completed Step',
    description: 'This step has been completed',
    index: 0,
    completed: true,
    className: 'wider-step',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Step',
    description: 'There was an error in this step',
    index: 0,
    error: true,
    className: 'wider-step',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Step',
    description: 'This step is disabled',
    index: 0,
    disabled: true,
    className: 'wider-step',
  },
};

export const VerticalOrientation: Story = {
  args: {
    label: 'Vertical Step',
    description: 'This step has vertical orientation',
    index: 0,
    orientation: 'vertical',
    className: 'wider-step',
  },
};

export const HorizontalOrientation: Story = {
  args: {
    label: 'Horizontal Step',
    description: 'This step has horizontal orientation',
    index: 0,
    orientation: 'horizontal',
    className: 'wider-step',
  },
};
