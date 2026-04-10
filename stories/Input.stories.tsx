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
      table: { defaultValue: { summary: 'md' } },
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
      table: { defaultValue: { summary: 'default' } },
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

/* ── Playground ────────────────────────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
    size: 'md',
    status: 'default',
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

/* ── Default ───────────────────────────────────────────────────────────────── */
export const Default: Story = {
  name: 'Default',
  render: () => (
    <div style={{ width: 320 }}>
      <Input placeholder="Enter a value…" />
    </div>
  ),
};

/* ── With Label ────────────────────────────────────────────────────────────── */
export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div style={{ width: 320 }}>
      <Input label="Full name" placeholder="Frida Kahlo" />
    </div>
  ),
};

/* ── With Helper Text ──────────────────────────────────────────────────────── */
export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => (
    <div style={{ width: 320 }}>
      <Input
        label="Email address"
        placeholder="you@example.com"
        helperText="We'll only use this to send you important updates."
      />
    </div>
  ),
};

/* ── Error ─────────────────────────────────────────────────────────────────── */
export const Error: Story = {
  name: 'Error',
  render: () => (
    <div style={{ width: 320 }}>
      <Input
        label="Email address"
        placeholder="you@example.com"
        status="error"
        defaultValue="not-an-email"
        errorText="Please enter a valid email address."
      />
    </div>
  ),
};

/* ── Disabled ──────────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={{ width: 320 }}>
      <Input
        label="Account ID"
        defaultValue="ACC-00142"
        disabled
        helperText="This field cannot be edited."
      />
    </div>
  ),
};

/* ── All Variants ──────────────────────────────────────────────────────────── */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <Input placeholder="Default — no label" />
      <Input label="With Label" placeholder="Labelled input" />
      <Input
        label="With Helper Text"
        placeholder="you@example.com"
        helperText="We'll only use this for account recovery."
      />
      <Input
        label="Error"
        placeholder="Enter value"
        status="error"
        defaultValue="bad-input"
        errorText="This field contains an invalid value."
      />
      <Input
        label="Success"
        placeholder="Enter value"
        status="success"
        defaultValue="valid@example.com"
        successText="Looks good!"
      />
      <Input label="Disabled" defaultValue="Read-only value" disabled />
    </div>
  ),
};

/* ── Sizes ─────────────────────────────────────────────────────────────────── */
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

/* ── With Icons ────────────────────────────────────────────────────────────── */
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Search" placeholder="Search…" leadingIcon={<SearchIcon />} />
      <Input label="Password" placeholder="Enter password" type="password" trailingIcon={<EyeIcon />} />
      <Input
        label="Both icons"
        placeholder="Search by name"
        leadingIcon={<SearchIcon />}
        trailingIcon={<EyeIcon />}
      />
    </div>
  ),
};

/* ── Required ──────────────────────────────────────────────────────────────── */
export const Required: Story = {
  name: 'Required',
  render: () => (
    <div style={{ width: 320 }}>
      <Input
        label="Full name"
        placeholder="Frida Kahlo"
        required
        helperText="As it appears on your passport."
      />
    </div>
  ),
};
