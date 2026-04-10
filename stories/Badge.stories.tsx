import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge, BadgeVariant } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'hot-pink', 'marigold', 'cobalt', 'teal',
        'hot-pink-subtle', 'marigold-subtle', 'cobalt-subtle', 'teal-subtle',
        'success', 'warning', 'error', 'info',
        'neutral', 'dark',
      ],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    dot: { control: 'boolean' },
    pill: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: 'hot-pink', size: 'md', label: 'New', dot: false, pill: false },
};

export const BrandSolid: Story = {
  name: 'Brand — Solid',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['hot-pink', 'marigold', 'cobalt', 'teal', 'dark'] as BadgeVariant[]).map((v) => (
        <Badge key={v} variant={v} label={v} />
      ))}
    </div>
  ),
};

export const BrandSubtle: Story = {
  name: 'Brand — Subtle',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['hot-pink-subtle', 'marigold-subtle', 'cobalt-subtle', 'teal-subtle'] as BadgeVariant[]).map((v) => (
        <Badge key={v} variant={v} label={v} />
      ))}
    </div>
  ),
};

export const Feedback: Story = {
  name: 'Feedback States',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" label="Success" dot />
      <Badge variant="warning" label="Warning" dot />
      <Badge variant="error" label="Error" dot />
      <Badge variant="info" label="Info" dot />
      <Badge variant="neutral" label="Neutral" dot />
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="hot-pink" size="sm" label="Small" />
      <Badge variant="hot-pink" size="md" label="Medium" />
    </div>
  ),
};

export const WithDot: Story = {
  name: 'Status Dot',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Badge variant="success" label="Online" dot />
      <Badge variant="warning" label="Away" dot />
      <Badge variant="error" label="Offline" dot />
      <Badge variant="neutral" label="Unknown" dot />
    </div>
  ),
};

export const Pill: Story = {
  name: 'Pill Shape',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {(['hot-pink', 'marigold', 'cobalt', 'teal', 'success', 'neutral'] as BadgeVariant[]).map((v) => (
        <Badge key={v} variant={v} label={v} pill />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, color: '#7a6e65', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Solid</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['hot-pink', 'marigold', 'cobalt', 'teal', 'dark', 'neutral'] as BadgeVariant[]).map((v) => (
            <Badge key={v} variant={v} label={v} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, color: '#7a6e65', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Subtle</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['hot-pink-subtle', 'marigold-subtle', 'cobalt-subtle', 'teal-subtle'] as BadgeVariant[]).map((v) => (
            <Badge key={v} variant={v} label={v} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 11, color: '#7a6e65', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Feedback</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['success', 'warning', 'error', 'info'] as BadgeVariant[]).map((v) => (
            <Badge key={v} variant={v} label={v} dot />
          ))}
        </div>
      </div>
    </div>
  ),
};
