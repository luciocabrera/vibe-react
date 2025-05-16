import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: maxWidths.full,
  },
});
