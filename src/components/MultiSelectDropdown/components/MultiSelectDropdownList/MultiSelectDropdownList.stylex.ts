import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  maxWidths,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  dropdownItem: {
    ':first-child': { borderBottom: border.sm, paddingBottom: spacing.xs },
    ':hover': {
      background: 'var(--background-color-4)',
    },
    alignItems: 'center',
    background: 'none',
    boxSizing: 'border-box',
    containerName: 'multi-select-list-item',
    containerType: 'inline-size',
    cursor: 'pointer',
    display: 'flex',
    maxWidth: maxWidths.fullContainerW,
    minHeight: spacing['3xl'],
    outline: 0,
    transition: 'background 0.15s',
    width: maxWidths.full,
  },
  dropdownList: {
    backgroundColor: 'var(--background-color-7)',
    border: border.sm,
    borderBottomLeftRadius: borderRadius.xs,
    borderBottomRightRadius: borderRadius.xs,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
    containerName: 'multi-select-list',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 220,
    maxWidth: maxWidths.fullContainerW,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: `${spacing.sm} ${spacing.xs}`,
    position: 'absolute',
    width: maxWidths.full,
    zIndex: 9999,
  },
});
