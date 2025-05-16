import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  fontSizes,
  spacing,
} from '@/styles/tokens.stylex';

export const colorVariants = stylex.create({
  ghost: {
    ':hover': {
      borderColor: 'var(--border-color-1)',
    },
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'var(--text-color-3)',
  },
  inverted: {
    backgroundColor: 'var(--background-color-7)',
    border: border.xs,
    borderColor: 'var(--border-color-1)',
    color: 'var(--text-color-3)',
  },
  primary: {
    backgroundColor: 'var(--background-color-1)',
    border: border.xs,
    borderColor: 'var(--border-color-1)',
    borderRadius: borderRadius.sm,
    color: 'var(--text-color-2)',
  },
  secondary: {
    backgroundColor: 'var(--background-color-4)',
    border: border.xs,
    borderColor: 'var(--border-color-1)',
    borderRadius: borderRadius.sm,
    color: 'var(--text-color-3)',
  },
});

export const sizeVariants = stylex.create({
  lg: {
    fontSize: fontSizes.md,
    minWidth: '150px',
    padding: `${spacing.sm} ${spacing.md}`,
  },
  md: { fontSize: fontSizes.sm, padding: `${spacing.xs} ${spacing.sm}` },
  sm: {
    fontSize: fontSizes.xs,
    minWidth: spacing['3xl'],
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  xl: { fontSize: '1.125rem', padding: `${spacing.md} ${spacing.lg}` },
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
    borderRadius: borderRadius.sm,
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
