import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'filter-section-container',
    containerType: 'inline-size',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.lg, // 24px
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md, // 12px
  },
});
