import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable } from './DataTable';
import { Badge } from './Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    caption: { control: 'text' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

/* ── Sample data ─────────────────────────────────────────────────────────── */

type ProjectRow = {
  name: string;
  client: string;
  status: string;
  budget: string;
  due: string;
};

const PROJECT_COLUMNS = [
  { key: 'name',   label: 'Project',  sortable: true },
  { key: 'client', label: 'Client',   sortable: true },
  {
    key: 'status',
    label: 'Status',
    align: 'center' as const,
    render: (_: unknown, row: ProjectRow) => {
      const map: Record<string, 'success' | 'warning' | 'error' | 'cobalt-subtle' | 'neutral'> = {
        'Active':    'success',
        'On Hold':   'warning',
        'Overdue':   'error',
        'Planning':  'cobalt-subtle',
        'Complete':  'neutral',
      };
      return <Badge variant={map[row.status] ?? 'neutral'} label={row.status} size="sm" dot />;
    },
  },
  { key: 'budget', label: 'Budget',   align: 'right' as const, sortable: true },
  { key: 'due',    label: 'Due',      sortable: true },
];

const PROJECT_ROWS: ProjectRow[] = [
  { name: 'Brand Refresh',     client: 'Estudio Avila',    status: 'Active',    budget: '$24,000', due: '2026-05-15' },
  { name: 'E-Comm Replatform', client: 'Fuego Market',     status: 'Planning',  budget: '$88,000', due: '2026-07-01' },
  { name: 'CMS Migration',     client: 'Libre Press',      status: 'On Hold',   budget: '$12,500', due: '2026-04-30' },
  { name: 'App Design Sprint', client: 'Colibri Health',   status: 'Active',    budget: '$36,000', due: '2026-05-01' },
  { name: 'Annual Report',     client: 'Raíces Foundation', status: 'Overdue',  budget: '$9,000',  due: '2026-03-31' },
  { name: 'Design System V2',  client: 'Avila DS',         status: 'Complete',  budget: '$45,000', due: '2026-04-08' },
];

/* ── Stories ─────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    caption: 'Projects',
    columns: PROJECT_COLUMNS as never,
    rows: PROJECT_ROWS as never,
    striped: false,
    hoverable: true,
    size: 'md',
  },
};

export const Striped: Story = {
  args: {
    caption: 'Projects — Striped',
    columns: PROJECT_COLUMNS as never,
    rows: PROJECT_ROWS as never,
    striped: true,
    hoverable: true,
    size: 'md',
  },
};

export const Compact: Story = {
  name: 'Size: Compact (sm)',
  args: {
    caption: 'Projects — Compact',
    columns: PROJECT_COLUMNS as never,
    rows: PROJECT_ROWS as never,
    striped: true,
    hoverable: true,
    size: 'sm',
  },
};

export const Spacious: Story = {
  name: 'Size: Spacious (lg)',
  args: {
    caption: 'Projects — Spacious',
    columns: PROJECT_COLUMNS as never,
    rows: PROJECT_ROWS as never,
    striped: false,
    hoverable: true,
    size: 'lg',
  },
};

export const WithFooter: Story = {
  name: 'With Footer / Pagination',
  args: {
    caption: 'Projects',
    columns: PROJECT_COLUMNS as never,
    rows: PROJECT_ROWS.slice(0, 3) as never,
    striped: false,
    hoverable: true,
    size: 'md',
    footer: (
      <span>
        Showing 1–3 of {PROJECT_ROWS.length} results
      </span>
    ),
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    caption: 'Projects',
    columns: PROJECT_COLUMNS as never,
    rows: [],
    emptyMessage: 'No projects found. Create one to get started.',
    size: 'md',
  },
};

export const WithCustomRenderers: Story = {
  name: 'Custom Cell Renderers',
  render: () => {
    type MetricRow = { metric: string; value: string; change: string; trend: string };

    const cols = [
      { key: 'metric', label: 'Metric', sortable: true },
      { key: 'value',  label: 'Value',  align: 'right' as const, sortable: true },
      {
        key: 'change',
        label: 'Change',
        align: 'right' as const,
        render: (val: unknown) => {
          const v = String(val);
          const isPos = v.startsWith('+');
          return (
            <span style={{ color: isPos
              ? 'var(--avila-color-feedback-success-text)'
              : 'var(--avila-color-feedback-error-text)' }}>
              {v}
            </span>
          );
        },
      },
      {
        key: 'trend',
        label: 'Trend',
        align: 'center' as const,
        render: (val: unknown) => (
          <Badge
            variant={String(val) === 'up' ? 'success' : 'error'}
            label={String(val) === 'up' ? '↑ Up' : '↓ Down'}
            size="sm"
          />
        ),
      },
    ];

    const rows: MetricRow[] = [
      { metric: 'Revenue',    value: '$142,000', change: '+18%',  trend: 'up' },
      { metric: 'New Clients', value: '34',      change: '+6%',   trend: 'up' },
      { metric: 'Churn Rate', value: '4.2%',     change: '-1.1%', trend: 'down' },
      { metric: 'Avg Project', value: '$22,400', change: '+9%',   trend: 'up' },
    ];

    return (
      <div style={{ maxWidth: 640 }}>
        <DataTable
          caption="KPI Overview — Q1 2026"
          columns={cols as never}
          rows={rows as never}
          striped
          hoverable
          size="md"
        />
      </div>
    );
  },
};
