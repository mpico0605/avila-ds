import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardAccent, CardVariant } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'] satisfies CardVariant[],
      description: 'Elevation level — flat surface, shadowed depth, or bordered outline',
      table: { defaultValue: { summary: 'default' } },
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Inner padding preset',
      table: { defaultValue: { summary: 'md' } },
    },
    title: { control: 'text', description: 'Card heading' },
    subtitle: { control: 'text', description: 'Secondary label beneath the title' },
    divider: {
      control: 'boolean',
      description: 'Show a hairline divider above the footer',
      table: { defaultValue: { summary: 'false' } },
    },
    accent: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'success', 'warning', 'destructive', 'rainbow'] satisfies (CardAccent | undefined)[],
      description: 'Top border stripe — solid token color or rainbow gradient',
      table: { defaultValue: { summary: 'none' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const SampleBody = () => (
  <p style={{ margin: 0, color: 'inherit' }}>
    Avila Design System surfaces are warm, editorial, and rooted in craft.
    Every card is a contained moment of clarity.
  </p>
);

const SampleFooter = () => (
  <button
    style={{
      background: 'var(--avila-color-accent-hot-pink)',
      color: 'var(--avila-color-text-inverse)',
      border: 'none',
      padding: 'var(--avila-space-2) var(--avila-space-5)',
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 'var(--avila-role-label-md)',
      letterSpacing: 'var(--avila-ls-widest)',
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderRadius: 'var(--avila-radius-sm)',
    }}
  >
    Learn More
  </button>
);

/* ── Playground ────────────────────────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    title: 'Card Title',
    subtitle: 'Optional subtitle',
    divider: false,
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Card {...args} footer={<SampleFooter />}>
        <SampleBody />
      </Card>
    </div>
  ),
};

/* ── Individual variants ───────────────────────────────────────────────────── */
export const Default: Story = {
  name: 'Default',
  render: () => (
    <div style={{ width: 360 }}>
      <Card variant="default" title="Default" subtitle="Flat surface with subtle border">
        <SampleBody />
      </Card>
    </div>
  ),
};

export const Elevated: Story = {
  name: 'Elevated',
  render: () => (
    <div style={{ width: 360 }}>
      <Card variant="elevated" title="Elevated" subtitle="Drop shadow for lifted depth">
        <SampleBody />
      </Card>
    </div>
  ),
};

export const Outlined: Story = {
  name: 'Outlined',
  render: () => (
    <div style={{ width: 360 }}>
      <Card variant="outlined" title="Outlined" subtitle="Strong border, no shadow">
        <SampleBody />
      </Card>
    </div>
  ),
};

/* ── All variants ──────────────────────────────────────────────────────────── */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {(['default', 'elevated', 'outlined'] as CardVariant[]).map((v) => (
        <Card key={v} variant={v} title={v.charAt(0).toUpperCase() + v.slice(1)} style={{ width: 280 }}>
          <SampleBody />
        </Card>
      ))}
    </div>
  ),
};

/* ── Padding sizes ─────────────────────────────────────────────────────────── */
export const PaddingSizes: Story = {
  name: 'Padding Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      {(['sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} variant="outlined" padding={p} title={`padding-${p}`}>
          <SampleBody />
        </Card>
      ))}
    </div>
  ),
};

/* ── With footer ───────────────────────────────────────────────────────────── */
export const WithFooter: Story = {
  name: 'With Footer + Divider',
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        variant="elevated"
        title="Card with Footer"
        subtitle="Divider + action slot"
        divider
        footer={<SampleFooter />}
      >
        <SampleBody />
      </Card>
    </div>
  ),
};

/* ── Accent variants ───────────────────────────────────────────────────────── */
export const AllAccents: Story = {
  name: 'All Accents',
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'success', 'warning', 'destructive', 'rainbow'] as CardAccent[]).map((a) => (
        <Card
          key={a}
          variant="elevated"
          accent={a}
          title={a.charAt(0).toUpperCase() + a.slice(1)}
          subtitle="Top stripe accent"
          style={{ width: 220 }}
        >
          <SampleBody />
        </Card>
      ))}
    </div>
  ),
};
