import * as stylex from '@stylexjs/stylex';

import { border, borderRadius, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  dragIcon: {
    color: 'var(--text-color-3)',
    fontSize: '1.2em',
  },
  isActive: {
    background: '#ddeeff',
    boxShadow: '0 2px 8px #1976d244',
    opacity: 0.7,
  },
  labelContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.md,
  },
  li: {
    alignItems: 'center',
    background: 'var(--background-color-8)',
    border: border.xs,
    borderRadius: borderRadius.sm,
    color: 'var(--text-color-3)',
    cursor: 'grab',
    display: 'flex',
    flex: 1,
    fontWeight: 500,
    gap: spacing.md,
    justifyContent: 'space-between',
    opacity: 1,
    padding: `${spacing.sm} ${spacing.lg}`,
    transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
  },
});
