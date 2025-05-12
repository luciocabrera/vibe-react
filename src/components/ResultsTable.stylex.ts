import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  groupRow: {
    background: '#ddeeff',
    fontWeight: 'bold',
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
