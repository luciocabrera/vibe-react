import * as stylex from '@stylexjs/stylex';

import { fontSizes, maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'multi-select-container',
    containerType: 'normal',
    fontSize: fontSizes.sm,
    maxWidth: maxWidths.fullContainerW,
    overflow: 'visible',
    position: 'relative',
  },
});
