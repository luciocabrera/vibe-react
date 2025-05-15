import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  ul: {
    alignItems: 'stretch', // Ensure children stretch to full width
    display: 'flex',
    flex: 1, // Allow the list to grow and fill available space
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: spacing.md,
    listStyle: 'none',
    margin: 0,
    padding: spacing.none,
    width: '100%',
  },
});
