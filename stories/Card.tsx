import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'light' | 'dark' | 'surface' | 'surface-raised';
export type CardPadding = 'sm' | 'md' | 'lg';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';
export type CardAccent = 'none' | 'hot-pink' | 'marigold' | 'cobalt' | 'teal';

export interface CardProps {
  /** Visual variant — controls background and text color */
  variant?: CardVariant;
  /** Inner padding size */
  padding?: CardPadding;
  /** Box shadow depth */
  shadow?: CardShadow;
  /** Whether to render a 1 px border */
  bordered?: boolean;
  /** Left-edge accent stripe color */
  accent?: CardAccent;
  /** Card title text */
  title?: string;
  /** Secondary label beneath the title */
  subtitle?: string;
  /** Footer slot — typically action buttons */
  footer?: React.ReactNode;
  /** Whether to render a <hr>-style divider between body and footer */
  divider?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AvilaDS Card — surface container with variant, shadow, and accent-stripe
 * options. Uses `--avila-*` CSS custom properties; no raw values in CSS.
 */
export const Card: React.FC<CardProps> = ({
  variant = 'light',
  padding = 'md',
  shadow = 'sm',
  bordered = true,
  accent = 'none',
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
    shadow !== 'none' ? styles[`shadow-${shadow}`] : '',
    bordered ? styles.bordered : '',
    accent !== 'none' ? styles[`accent-${accent}`] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style}>
      {(title || subtitle) && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
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
