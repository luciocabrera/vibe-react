import * as stylex from '@stylexjs/stylex';

import { maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  input: {
    ':focus-visible': {
      border: 'none',
      outline: 'none',
    },
    background: 'transparent',
    border: 'none',
    color: 'var(--text-color-1)',
    inset: 'unset',
    maxWidth: maxWidths.fullContainerW,
    outline: 'none',
    overflow: 'hidden',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    position: 'relative',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: maxWidths.full,
  },
});
