import React, { useState, useMemo } from 'react';
import styles from './DataTable.module.css';

export type ColumnAlign = 'left' | 'center' | 'right';

export interface Column<T = Record<string, unknown>> {
  /** Unique key matching a property on row data */
  key: string;
  /** Column header label */
  label: string;
  /** Optional fixed width (CSS value) */
  width?: string;
  /** Text alignment */
  align?: ColumnAlign;
  /** Enable client-side sorting for this column */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T) => React.ReactNode;
}

export type TableSize = 'sm' | 'md' | 'lg';

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Column definitions */
  columns: Column<T>[];
  /** Row data array — each object should have keys matching `column.key` */
  rows: T[];
  /** Optional title shown above the table */
  caption?: string;
  /** Alternate row background color */
  striped?: boolean;
  /** Highlight rows on hover */
  hoverable?: boolean;
  /** Padding / font-size preset */
  size?: TableSize;
  /** Slot rendered below the table (e.g. pagination) */
  footer?: React.ReactNode;
  /** Message shown when `rows` is empty */
  emptyMessage?: string;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

const SortIcon: React.FC<{ direction: SortDirection }> = ({ direction }) => (
  <span className={styles.sortIcon} aria-hidden="true">
    {direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}
  </span>
);

/**
 * AvilaDS DataTable — a simple, composable data table with optional
 * striping, hover, client-side sorting, and custom cell renderers.
 * Uses `--avila-*` CSS custom properties; no raw values in CSS.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  striped = false,
  hoverable = true,
  size = 'md',
  footer,
  emptyMessage = 'No data to display.',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (colKey: string) => {
    if (sortKey !== colKey) {
      setSortKey(colKey);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortKey || !sortDir) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir]);

  const tableClasses = [
    styles.table,
    striped ? styles.striped : '',
    hoverable ? styles.hoverable : '',
    styles[`size-${size}`],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.tableWrapper}>
      <table className={tableClasses}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => {
              const isSortedCol = sortKey === col.key;
              const thClass = [
                styles.th,
                col.sortable ? styles.sortable : '',
                isSortedCol && sortDir === 'asc' ? styles.sortAsc : '',
                isSortedCol && sortDir === 'desc' ? styles.sortDesc : '',
                col.align === 'right' ? styles.alignRight : '',
                col.align === 'center' ? styles.alignCenter : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th
                  key={col.key}
                  className={thClass}
                  style={{ width: col.width }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    isSortedCol
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : col.sortable
                      ? 'none'
                      : undefined
                  }
                  scope="col"
                >
                  {col.label}
                  {col.sortable && (
                    <SortIcon direction={isSortedCol ? sortDir : null} />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col) => {
                  const cellClass = [
                    styles.td,
                    col.align === 'right' ? styles.alignRight : '',
                    col.align === 'center' ? styles.alignCenter : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const value = row[col.key];
                  return (
                    <td key={col.key} className={cellClass}>
                      {col.render ? col.render(value, row) : String(value ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default DataTable;
