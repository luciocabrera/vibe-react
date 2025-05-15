import * as stylex from '@stylexjs/stylex';

import { maxWidths,spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'accordion-container',
    containerType: 'normal',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    maxWidth: maxWidths.fullContainerW,
    width: maxWidths.full,
  },
});
