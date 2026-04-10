import React, { useId } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the input */
  label?: string;
  /** Marks the field as required (appends asterisk to label) */
  required?: boolean;
  /** Height / font-size size preset */
  size?: InputSize;
  /** Validation state */
  status?: InputStatus;
  /** Helper copy shown beneath the input */
  helperText?: string;
  /** Error message — shown when status is 'error' */
  errorText?: string;
  /** Success message — shown when status is 'success' */
  successText?: string;
  /** Icon rendered inside the leading (left) edge */
  leadingIcon?: React.ReactNode;
  /** Icon rendered inside the trailing (right) edge */
  trailingIcon?: React.ReactNode;
}

/**
 * AvilaDS Input — single-line text field with size, status, label,
 * and icon-slot variants. Uses `--avila-*` CSS custom properties.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required = false,
      size = 'md',
      status = 'default',
      helperText,
      errorText,
      successText,
      leadingIcon,
      trailingIcon,
      id: idProp,
      disabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const inputClasses = [
      styles.input,
      styles[`size-${size}`],
      status !== 'default' ? styles[`status-${status}`] : '',
      leadingIcon ? styles.hasLeadingIcon : '',
      trailingIcon ? styles.hasTrailingIcon : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const subText =
      status === 'error' && errorText ? (
        <span className={styles.errorText} role="alert">{errorText}</span>
      ) : status === 'success' && successText ? (
        <span className={styles.successText}>{successText}</span>
      ) : helperText ? (
        <span className={styles.helperText}>{helperText}</span>
      ) : null;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={status === 'error'}
            aria-describedby={subText ? `${id}-sub` : undefined}
            className={inputClasses}
            {...rest}
          />
          {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
        </div>
        {subText && <div id={`${id}-sub`}>{subText}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
