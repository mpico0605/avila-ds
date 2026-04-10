import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from './Input';

/* ── Minimal inline SVG icons for demo ──────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and font-size preset',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    successText: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
    size: 'md',
    status: 'default',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Small (sm)" placeholder="Small input" size="sm" />
      <Input label="Medium (md)" placeholder="Medium input" size="md" />
      <Input label="Large (lg)" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const Statuses: Story = {
  name: 'Validation States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Default" placeholder="Default state" status="default" />
      <Input
        label="Error"
        placeholder="Invalid input"
        status="error"
        defaultValue="bad@input"
        errorText="Please enter a valid email address."
      />
      <Input
        label="Success"
        placeholder="Valid input"
        status="success"
        defaultValue="good@example.com"
        successText="Email verified successfully."
      />
      <Input label="Disabled" placeholder="Not editable" disabled defaultValue="locked" />
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Search" placeholder="Search…" leadingIcon={<SearchIcon />} />
      <Input label="Password" placeholder="Enter password" type="password" trailingIcon={<EyeIcon />} />
      <Input
        label="Full"
        placeholder="Search by name"
        leadingIcon={<SearchIcon />}
        trailingIcon={<EyeIcon />}
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Frida Kahlo',
    required: true,
    helperText: 'As it appears on your passport.',
    size: 'md',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
