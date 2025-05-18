import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  fontSizes,
  maxWidths,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  label: {
    alignItems: 'center',
    border: border.xs,
    borderRadius: borderRadius.sm,
    boxSizing: 'border-box',
    display: 'flex',
    fontSize: fontSizes.sm,
    maxWidth: maxWidths.full,
    paddingInlineEnd: spacing.sm,
    position: 'relative',
    width: maxWidths.full,
  },
  selectedItemsDisplay: {
    fontSize: fontSizes.sm,
    maxWidth: maxWidths.full,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: maxWidths.full,
  },
  triggerButton: {
    alignItems: 'center',
    background: 'inherit',
    border: border.none,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    padding: `${spacing.sm} ${spacing.md}`,
    textAlign: 'left',
    userSelect: 'none',
    width: maxWidths.full,
  },
});
