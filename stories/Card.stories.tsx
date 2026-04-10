import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'dark', 'surface', 'surface-raised'],
      description: 'Background/text color variant',
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    accent: {
      control: 'select',
      options: ['none', 'hot-pink', 'marigold', 'cobalt', 'teal'],
      description: 'Left-edge accent stripe',
    },
    bordered: { control: 'boolean' },
    divider: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleBody = () => (
  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'inherit' }}>
    Avila Design System surfaces are warm, editorial, and rooted in craft.
    Every card is a contained moment of clarity.
  </p>
);

export const Default: Story = {
  args: {
    variant: 'light',
    padding: 'md',
    shadow: 'sm',
    bordered: true,
    accent: 'none',
    title: 'Card Title',
    subtitle: 'Optional subtitle',
    children: <SampleBody />,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    padding: 'md',
    shadow: 'md',
    bordered: true,
    title: 'Dark Variant',
    subtitle: 'Ink-100 background',
    children: <SampleBody />,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Surface: Story = {
  args: {
    variant: 'surface',
    padding: 'md',
    shadow: 'sm',
    bordered: true,
    title: 'Surface Variant',
    subtitle: 'Parchment background',
    children: <SampleBody />,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithAccentStripe: Story = {
  name: 'Accent Stripes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      {(['hot-pink', 'marigold', 'cobalt', 'teal'] as const).map((accent) => (
        <Card key={accent} variant="light" accent={accent} bordered padding="md" shadow="sm"
          title={`Accent: ${accent}`} subtitle="Left-edge stripe">
          <SampleBody />
        </Card>
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  args: {
    variant: 'light',
    padding: 'md',
    shadow: 'sm',
    bordered: true,
    divider: true,
    title: 'Card with Footer',
    subtitle: 'Divider + action slot',
    children: <SampleBody />,
    footer: (
      <button
        style={{
          background: 'var(--avila-color-interactive-primary-bg)',
          color: 'var(--avila-color-interactive-primary-text)',
          border: 'none',
          padding: '8px 20px',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 14,
          letterSpacing: '0.04em',
          cursor: 'pointer',
        }}
      >
        Learn More
      </button>
    ),
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 20 }}>
      {(['light', 'dark', 'surface', 'surface-raised'] as const).map((v) => (
        <Card key={v} variant={v} bordered shadow="sm" padding="md" title={v}>
          <SampleBody />
        </Card>
      ))}
    </div>
  ),
};
