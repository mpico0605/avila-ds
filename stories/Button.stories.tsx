import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ArrowRight, Download, Check } from 'lucide-react';

import { Button } from './Button.tsx';
import type { ButtonVariant, ButtonSize } from './Button.tsx';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'AvilaDS/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AvilaDS Button — six Figma-sourced variants, three sizes, ' +
          'disabled state, and optional icon slots. ' +
          'All colors resolve through CSS custom properties from the token pipeline.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'dark', 'teal', 'cobalt', 'marigold'] satisfies ButtonVariant[],
      description: 'Visual style. Maps 1-to-1 with the Figma Button/* components.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
      description: 'Height / padding scale. md (44 px) is the Figma spec size.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dims the button to 40 % opacity and blocks interaction.',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Button label. Rendered in Bebas Neue — naturally uppercase.',
    },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    type: { table: { disable: true } },
  },
  args: {
    children: 'Get Started',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground (all controls live here) ──────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'View Work' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Case Study' },
};

export const Dark: Story = {
  args: { variant: 'dark', children: 'Dark Mode' },
};

export const Teal: Story = {
  args: { variant: 'teal', children: 'Download' },
};

export const Cobalt: Story = {
  args: { variant: 'cobalt', children: 'Learn More' },
};

export const Marigold: Story = {
  args: { variant: 'marigold', children: 'Get Started' },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { variant: 'primary', size: 'md', children: 'Medium' },
};

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Disabled' },
};

export const DisabledOutline: Story = {
  name: 'Disabled / Outline',
  args: { variant: 'outline', disabled: true, children: 'Disabled' },
};

// ─── All Variants Showcase ────────────────────────────────────────────────────

const VARIANTS: ButtonVariant[] = ['primary', 'outline', 'dark', 'teal', 'cobalt', 'marigold'];
const LABELS: Record<ButtonVariant, string> = {
  primary:  'View Work',
  outline:  'Case Study',
  dark:     'Dark Mode',
  teal:     'Download',
  cobalt:   'Learn More',
  marigold: 'Get Started',
};

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* ── Sizes per variant ── */}
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {(['sm', 'md', 'lg'] as ButtonSize[]).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {LABELS[variant]}
            </Button>
          ))}
          <Button variant={variant} disabled>
            {LABELS[variant]}
          </Button>
        </div>
      ))}
    </div>
  ),
};

// ─── Size Comparison ──────────────────────────────────────────────────────────

export const SizeComparison: Story = {
  name: 'Size Comparison',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Button variant="primary" size="sm">Small — 36 px</Button>
      <Button variant="primary" size="md">Medium — 44 px</Button>
      <Button variant="primary" size="lg">Large — 52 px</Button>
    </div>
  ),
};

// ─── Icon Variants ────────────────────────────────────────────────────────────

export const WithRightIcon: Story = {
  name: 'Icons / Right Icon',
  args: { variant: 'primary', children: 'Next Step', rightIcon: <ArrowRight size={16} /> },
};

export const WithLeftIcon: Story = {
  name: 'Icons / Left Icon',
  args: { variant: 'teal', children: 'Download', leftIcon: <Download size={16} /> },
};

export const WithBothIcons: Story = {
  name: 'Icons / Both',
  args: { variant: 'cobalt', children: 'Confirm', leftIcon: <Check size={16} />, rightIcon: <ArrowRight size={16} /> },
};

export const IconsAllVariants: Story = {
  name: 'Icons / All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Button variant="primary" rightIcon={<ArrowRight size={16} />}>View Work</Button>
        <Button variant="outline" rightIcon={<ArrowRight size={16} />}>Case Study</Button>
        <Button variant="dark" rightIcon={<ArrowRight size={16} />}>Learn More</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Button variant="teal" leftIcon={<Download size={16} />}>Download</Button>
        <Button variant="cobalt" leftIcon={<Check size={16} />}>Confirm</Button>
        <Button variant="marigold" leftIcon={<Check size={16} />} rightIcon={<ArrowRight size={16} />}>Get Started</Button>
      </div>
    </div>
  ),
};
