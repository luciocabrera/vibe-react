import * as stylex from '@stylexjs/stylex';

import { maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  badgesContainer: {
    boxSizing: 'border-box',
    containerName: 'badges-container',
    containerType: 'normal',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    maxWidth: maxWidths.fullContainerW,
    minWidth: 0,
    padding: spacing.md,
  },
});
