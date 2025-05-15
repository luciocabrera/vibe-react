import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  badgesContainer: {
    boxSizing: 'border-box',
    containerName: 'badges-container',
    containerType: 'normal',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    // maxWidth: '100%',
    // minWidth: 0,
    // overflow: 'hidden',
    padding: spacing.md,
  },
});
