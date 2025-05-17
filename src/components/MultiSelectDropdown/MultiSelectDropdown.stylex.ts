import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'multi-select-container',
    containerType: 'normal',
    maxWidth: maxWidths.fullContainerW,
    overflow: 'visible',
    position: 'relative',
  },
});
