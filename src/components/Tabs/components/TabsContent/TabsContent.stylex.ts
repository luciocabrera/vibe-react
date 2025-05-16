import * as stylex from '@stylexjs/stylex';

import { maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  active: { display: 'block' },
  inactive: { display: 'none' },
  tabPanel: { width: maxWidths.full },
  tabsContent: {
    display: 'block',
    flex: 1,
    maxHeight: `calc(100cqh - ${spacing['5xl']})`,
    minHeight: 0,
    overflow: 'auto',
    padding: spacing.lg,
    position: 'relative',
  },
});
