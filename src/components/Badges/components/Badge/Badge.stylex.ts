import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  fontSizes,
  maxWidths,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  badge: {
    alignItems: 'center',
    background: 'var(--background-color-8)',
    border: border.xs,
    borderRadius: borderRadius.lg,
    color: 'var(--text-color-3)',
    containerName: 'badge-container',
    containerType: 'normal',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: fontSizes.xs,
    fontWeight: 500,
    gap: spacing.sm,
    maxHeight: spacing['2xl'],
    maxWidth: `calc(${maxWidths.fullContainerW} - ${spacing['7xl']})`,
    overflow: 'hidden',
    padding: `${spacing.xs} ${spacing.md}`,
    width: 'fit-content',
  },
  more: {
    backgroundColor: 'var(--background-color-6)',
  },
  removeButton: {
    ':hover': {
      color: 'var(--danger)',
    },
    background: 'transparent',
    border: border.none,
    color: 'var(--text-color-3)',
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    lineHeight: 1,
    marginLeft: spacing.xs,
    padding: `${spacing.none} ${spacing.xs}`,
  },
  value: {
    display: 'block',
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: maxWidths.full,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
