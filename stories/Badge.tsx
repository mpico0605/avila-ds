import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'hot-pink'
  | 'marigold'
  | 'cobalt'
  | 'teal'
  | 'hot-pink-subtle'
  | 'marigold-subtle'
  | 'cobalt-subtle'
  | 'teal-subtle'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'dark';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Visual variant — brand accent, subtle tint, feedback, or neutral */
  variant?: BadgeVariant;
  /** Height preset */
  size?: BadgeSize;
  /** Badge label text */
  label: string;
  /** Show a leading status dot */
  dot?: boolean;
  /** Pill (fully rounded) instead of sharp corners */
  pill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AvilaDS Badge — compact label chip with brand, feedback, and neutral
 * variants. Sharp by default; opt-in `pill` for fully rounded edges.
 * Uses `--avila-*` CSS custom properties.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  label,
  dot = false,
  pill = false,
  className,
  style,
}) => {
  const classes = [
    styles.badge,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    pill ? styles.pill : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {label}
    </span>
  );
};

export default Badge;
