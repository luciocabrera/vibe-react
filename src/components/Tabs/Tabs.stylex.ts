import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  tabs: {
    containerName: 'tabs-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
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
    display: 'block',
    flex: 1,
    maxHeight: 'calc(100cqh - 40px)', // 40px is the tab buttons height
    minHeight: 0,
    overflow: 'auto',
    padding: spacing.lg,
    position: 'relative',
  },
});
