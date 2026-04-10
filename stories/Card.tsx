import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'sm' | 'md' | 'lg';
export type CardAccent = 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'rainbow';

export interface CardProps {
  /** Visual elevation variant */
  variant?: CardVariant;
  /** Inner padding size */
  padding?: CardPadding;
  /** Top border stripe color — maps to brand/feedback tokens; 'rainbow' renders a gradient */
  accent?: CardAccent;
  /** Card title text */
  title?: string;
  /** Secondary label beneath the title */
  subtitle?: string;
  /** Footer slot — typically action buttons */
  footer?: React.ReactNode;
  /** Render a hairline divider between body and footer */
  divider?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AvilaDS Card — surface container with three elevation levels.
 * Uses `--avila-*` CSS custom properties; no raw values in CSS.
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  accent,
  title,
  subtitle,
  footer,
  divider = false,
  children,
  className,
  style,
}) => {
  const classes = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    accent ? styles[`accent-${accent}`] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
      {footer && (
        <>
          {divider && <hr className={styles.divider} />}
          <div className={styles.footer}>{footer}</div>
        </>
      )}
    </div>
  );
};

export default Card;
