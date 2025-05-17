import * as stylex from '@stylexjs/stylex';

import { fontWeights } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  groupRow: {
    background: '#ddeeff',
    fontWeight: fontWeights.bold,
  },
  highlightBest: {
    background: '#e0ffe0',
  },
  highlightWorst: {
    background: '#ffe0e0',
  },
  table: {
    background: '#fff',
    borderCollapse: 'collapse',
    marginTop: 20,
    width: '100%',
  },
});
