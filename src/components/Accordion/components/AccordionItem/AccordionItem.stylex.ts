import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  maxWidths,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  content: {
    containerName: 'accordion-content-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: maxWidths.fullContainerW,
    padding: spacing.none,
    width: maxWidths.full,
  },
  details: {
    border: border.xs,
    borderRadius: borderRadius.sm,
    containerName: 'details-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: maxWidths.fullContainerW,
    width: maxWidths.full,
  },
  summary: {
    cursor: 'pointer',
    padding: spacing.md,
  },
});
