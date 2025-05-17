import * as stylex from '@stylexjs/stylex';

import { fontSizes, fontWeights, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  header: {
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${spacing.md} ${spacing.lg}`,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
  },
});
