import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    display: 'flex',
    gap: spacing.sm,
  },
});
