import * as stylex from '@stylexjs/stylex';

import { fontSizes, fontWeights, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  tabsButtonsWrapper: {
    alignContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    borderBottom: '1px solid var(--color-border-2)',
    borderTop: '1px solid var(--color-border-2)',
    color: 'var(--background-color-1)',
    display: 'flex',
    flexWrap: 'nowrap',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    height: spacing['5xl'],
    letterSpacing: '1px',
    padding: spacing.none,
  },
});
