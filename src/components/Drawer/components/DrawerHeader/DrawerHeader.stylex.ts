import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  header: {
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${spacing.md} ${spacing.lg}`,
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 600,
  },
});
