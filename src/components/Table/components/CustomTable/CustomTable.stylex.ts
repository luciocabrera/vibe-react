import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },

  table: {
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: '100%',
  },
});
