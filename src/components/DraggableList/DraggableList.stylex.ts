import * as stylex from '@stylexjs/stylex';

import { maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  ul: {
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: spacing.md,
    listStyle: 'none',
    margin: 0,
    padding: spacing.none,
    width: maxWidths.full,
  },
});
