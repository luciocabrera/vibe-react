import * as stylex from '@stylexjs/stylex';

import { border, maxWidths, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  row: {
    alignItems: 'center',
    background: 'none',
    borderBottom: border.xs,
    boxSizing: 'border-box',
    containerName: 'multi-select-list-row',
    containerType: 'inline-size',
    display: 'flex',
    height: spacing['7xl'],
    justifyContent: 'flex-end',
    maxHeight: spacing['7xl'],
    maxWidth: maxWidths.fullContainerW,
    minHeight: spacing['7xl'],
    outline: spacing.none,
    padding: `${spacing.none} ${spacing.md}`,
    transition: 'background 0.15s',
    width: maxWidths.full,
  },
});
