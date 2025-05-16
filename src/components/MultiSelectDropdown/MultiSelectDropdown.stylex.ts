import * as stylex from '@stylexjs/stylex';

import { border, borderRadius, maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'multi-select-container',
    containerType: 'normal',
    maxWidth: maxWidths.fullContainerW,
    overflow: 'visible',
    position: 'relative',
  },
  label: {
    border: border.xs,
    borderBottomRightRadius: borderRadius.sm,
    borderTopRightRadius: borderRadius.sm,
    boxSizing: 'border-box',
    display: 'flex',
    maxWidth: maxWidths.full,
    position: 'relative',
    width: maxWidths.full,
  },
  selectedItemsDisplay: {
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
