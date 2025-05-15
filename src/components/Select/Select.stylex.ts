import * as stylex from '@stylexjs/stylex';

import { borderRadius, maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  input: {
    ':focus-visible': {
      border: 'none',
      outline: 'none',
    },
    background: 'transparent',
    border: 'none',
    borderRadius: borderRadius.md,
    color: 'var(--text-color-1)',
    inset: 'unset',
    outline: 'none',
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    position: 'relative',
     top: '1px',
    width: maxWidths.full,
  },
});
