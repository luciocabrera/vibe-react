import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  button: {
    minWidth: spacing['4xl'],
  },
  container: {
    display: 'flex',
    gap: spacing.sm,
  },
});
