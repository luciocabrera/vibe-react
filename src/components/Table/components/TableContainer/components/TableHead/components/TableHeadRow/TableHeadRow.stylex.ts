import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  paddingCell: (width) => ({
    display: 'flex',
    width,
  }),
  row: {
    display: 'flex',
    width: maxWidths.full,
  },
});
