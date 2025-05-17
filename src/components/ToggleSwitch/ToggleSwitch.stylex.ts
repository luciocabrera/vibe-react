import * as stylex from '@stylexjs/stylex';

import { borderRadius, fontSizes, spacing } from '@/styles/tokens.stylex';

// TODO: Add background color to the variables in the css

export const styles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  input: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  label: {
    fontSize: fontSizes.xs,
    marginLeft: spacing.sm,
    minWidth: spacing['3xl'],  },
  thumb: (isActive: boolean) => ({
    background: 'var(--background-color-7)',
    borderRadius: '50%',
    bottom: '2px',
    content: '""',
    height: spacing.lg,
    left: isActive ? '22px' : '2px',
    position: 'absolute',
    transition: 'left 0.3s',
    width: spacing.lg,
  }),
  track: (isActive: boolean) => ({
    background: isActive ? 'var(--background-color-1)' : '#ccc',
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    display: 'inline-block',
    height: spacing.xl,
    position: 'relative',
    transition: 'background 0.3s',
    width: spacing['5xl'],
  }),
});
