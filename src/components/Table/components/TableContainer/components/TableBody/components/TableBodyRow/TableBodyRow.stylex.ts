import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  paddingCell: (width) => ({
    display: 'flex',
    width,
  }),
  tr: (translateY) => ({
    ':hover': {
      backgroundColor: 'var(--background-color-3)',
      borderBottom: '1px solid var(--border-color-3)',
      color: 'var(--color-3)',
      cursor: 'pointer',
    },
    ':nth-child(even)': { backgroundColor: 'var(--background-color-7)' },
    borderBottom: '1px solid var(--border-color-2)',
    display: 'flex',
    position: 'absolute',
    transform: `translateY(${translateY}px)`,
    width: maxWidths.full,
  }),
});
