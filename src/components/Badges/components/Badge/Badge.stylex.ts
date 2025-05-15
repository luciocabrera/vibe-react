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
    color: '#333',
    containerName: 'badge-container',
    containerType: 'normal',
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    fontSize: fontSizes.xs,
    fontWeight: 500,
    gap: spacing.sm,
    maxHeight: spacing.xl,
    maxWidth: `calc(${maxWidths.fullContainerW} - 4rem)`,
    overflow: 'hidden',
    padding: `${spacing.xs} 1rem`,
    width: 'fit-content',
  },
  more: {
    backgroundColor: '#e0e0e0',
  },
  removeButton: {
    ':hover': {
      color: 'red',
    },
    background: 'transparent',
    border: border.none,
    color: '#666',
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    lineHeight: 1,
    marginLeft: spacing.xs,
    padding: `0 ${spacing.xs}`,
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
