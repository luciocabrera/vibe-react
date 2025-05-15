import * as stylex from '@stylexjs/stylex';

export const spacing = stylex.defineVars({
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
});

export const borderRadius = stylex.defineVars({
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  pill: '9999px',
});

export const border = stylex.defineVars({
  none: 'none',
  xs: '1px solid var(--border-color-2)',
  sm: '1px solid var(--border-color-4)',
  md: '2px solid var(--border-color-1)',
  lg: '3px solid var(--border-color-3)',
});

export const fontSizes = stylex.defineVars({
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
});

export const shadows = stylex.defineVars({
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 2px 8px rgba(0,0,0,0.10)',
  lg: '0 4px 16px rgba(0,0,0,0.15)',
});

export const animations = stylex.defineVars({
  fast: '150ms cubic-bezier(0.4,0,0.2,1)',
  normal: '300ms cubic-bezier(0.4,0,0.2,1)',
  slow: '600ms cubic-bezier(0.4,0,0.2,1)',
  bounce: 'bounce 1s infinite',
});
