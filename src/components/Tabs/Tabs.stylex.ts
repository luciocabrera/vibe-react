import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  tabs: { display: 'flex', flex: 1, flexDirection: 'column', height: '100%' },
  tabsButtonsWrapper: {
    alignContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    borderBottom: '1px solid var(--color-border-2)',
    borderTop: '1px solid var(--color-border-2)',
    color: 'var(--background-color-1)',
    display: 'flex',
    flexWrap: 'nowrap',
    fontSize: '15px',
    fontWeight: '500',
    height: '40px',
    letterSpacing: '1px',
    padding: spacing.none,
  },
  tabsContent: {
    // background: 'var(--background-color-1)',
    // color: 'var(--color-text-1)',
    display: 'flex',
    padding: spacing.lg,
  },
});
