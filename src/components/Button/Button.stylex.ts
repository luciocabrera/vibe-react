import * as stylex from '@stylexjs/stylex';

export const colorVariants = stylex.create({
  ghost: {
    ':hover': {
      borderColor: 'var(--border-color-1)',
    },
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--text-color-3)',
  },
  inverted: {
    backgroundColor: 'var(--background-color-7)',
    borderColor: 'var(--border-color-1)',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--text-color-3)',
  },
  primary: {
    backgroundColor: 'var(--background-color-1)',
    border: 'none',
    borderColor: 'var(--border-color-1)',
    borderRadius: 'var(--border-radius-sm)',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--text-color-2)',
  },
  secondary: {
    backgroundColor: 'var(--background-color-4)',
    border: 'none',
    borderColor: 'var(--border-color-1)',
    borderRadius: 'var(--border-radius-sm)',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'var(--text-color-3)',
  },
});

export const sizeVariants = stylex.create({
  lg: { fontSize: '16px', minWidth: '150px', padding: '0.5rem 1rem' },
  md: { fontSize: '14px', padding: '6px 12px' },
  sm: { fontSize: '12px', padding: '4px 8px' },
  xl: { fontSize: '18px', padding: '10px 20px' },
});

export type ColorVariants = keyof typeof colorVariants;

export type SizeVariants = keyof typeof sizeVariants;

export const styles = stylex.create({
  base: {
    ':hover': {
      boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.75)',
      opacity: 0.9,
    },
    alignItems: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    transition: 'background-color 0.2s, color 0.2s',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  loading: {
    pointerEvents: 'none',
  },
});
