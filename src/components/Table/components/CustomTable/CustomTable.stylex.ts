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

  leftPinned: {
    left: 0,
  },

  pinnedSection: {
    backgroundColor: '#fff',
    borderRight: '1px solid #e1e5e9',
    position: 'sticky',
    zIndex: 2,
  },

  rightPinned: {
    borderLeft: '1px solid #e1e5e9',
    borderRight: 'none',
    right: 0,
  },

  scrollableSection: {
    flex: 1,
    minWidth: 0,
  },

  table: {
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    width: '100%',
  },

  tableWrapper: {
    display: 'flex',
    height: '100%',
    minWidth: 'fit-content',
    position: 'relative',
  },
});
