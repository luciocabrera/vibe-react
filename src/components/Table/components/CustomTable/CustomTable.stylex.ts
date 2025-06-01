import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    containerName: 'table-container',
    containerType: 'normal',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },

  table: {
    borderCollapse: 'collapse',
    containerName: 'table-element',
    containerType: 'normal',
    tableLayout: 'fixed',
    width: '100%',
  },
});
