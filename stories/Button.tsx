import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import './button.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'outline' | 'dark' | 'teal' | 'cobalt' | 'marigold';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — maps directly to Figma Button variants */
  variant?: ButtonVariant;
  /** Height / padding scale. md (44 px) matches the Figma spec. */
  size?: ButtonSize;
  /** Button label */
  children: React.ReactNode;
  /** Stretch button to fill its container */
  fullWidth?: boolean;
  /**
   * Merges all button props onto the immediate child element instead of
   * rendering a <button>. Useful for rendering the button as a link or
   * custom component while keeping all AvilaDS styles and accessibility.
   *
   * @example
   * <Button asChild variant="primary">
   *   <a href="/dashboard">Go to dashboard</a>
   * </Button>
   */
  asChild?: boolean;
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AvilaDS Button
 *
 * All colors come from CSS custom properties (dist/css/tokens.*.css).
 * Switch the `data-theme="dark"` attribute on any ancestor to flip every
 * button to its dark-mode value automatically — no prop change needed.
 *
 * Supports `asChild` via Radix's Slot primitive: pass `asChild` to render
 * the button styles on any child element (e.g. a router <Link>).
 *
 * Figma source: AVILA UI — Design System → Button/*
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  disabled = false,
  type = 'button',
  leftIcon,
  rightIcon,
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const classes = [
    'avila-btn',
    `avila-btn--${variant}`,
    `avila-btn--${size}`,
    fullWidth ? 'avila-btn--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...(!asChild ? { type } : {})}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="avila-btn__icon avila-btn__icon--left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="avila-btn__icon avila-btn__icon--right">{rightIcon}</span>}
    </Comp>
  );
}
