import * as stylex from '@stylexjs/stylex';

import { fontSizes, maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  active: { background: 'var(--background-color-11)' },
  button: {
    ':hover': {
      boxShadow:
        '10px 10px 30px var(--background-color-10), -30px -30px 60px #ffffff',
      opacity: '0.8',
    },
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--background-color-1)',
    cursor: 'pointer',
    fontSize: fontSizes.md,
    height: '38px',
    inset: 'unset',
    overflow: 'hidden',
    padding: `${spacing.none} ${spacing.lg}`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: maxWidths.fullContainerW,
  },
});
