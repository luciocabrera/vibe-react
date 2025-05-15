import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    display: 'inline-block',
    marginRight: spacing.lg, // 24px
  },
  input: {
    width: 70,
  },
  leftInput: {
    marginLeft: spacing.sm, // 8px
  },
  resetButton: {
    marginLeft: spacing.xs, // 4px
  },
});
