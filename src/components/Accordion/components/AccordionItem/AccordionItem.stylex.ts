import * as stylex from '@stylexjs/stylex';

import { border, borderRadius, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  content: {
    containerName: 'accordion-content-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: '100cqw',
    padding: spacing.none,
    width: '100%',
  },
  details: {
    border: border.xs,
    borderRadius: borderRadius.md,
    containerName: 'details-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: '100cqw',
    width: '100%',
  },
  summary: {
    cursor: 'pointer',
    padding: spacing.md,
  },
});
