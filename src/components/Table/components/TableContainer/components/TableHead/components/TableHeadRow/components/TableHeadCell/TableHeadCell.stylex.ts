import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  buttonHeader: {
    background: 'var(--background-color-10)',
    border: 'none',
    color: 'var(--text-color-2)',
    cursor: 'pointer',
    height: '100%',
    overflow: 'hidden',
    paddingLeft: '6px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  isResizing: {
    background: 'blue',
    opacity: 1,
  },
  resizer: {
    ':hover': {
      background: 'rgba(0, 0, 0, 0.5)',
      width: '5px',
    },
    background: 'var(--border-color-2)',
    cursor: 'col-resize',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    touchAction: 'none',
    userSelect: 'none',
    width: '3px',
  },
  sortable: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  sortingSpan: {
    fontSize: 'medium',
  },
  th: (width) => ({
    background: 'var(--border-color-2)',
    border: 0,
    borderRight: '1px solid var(--border-color-2)',
    display: 'flex',
    height: '28px',
    minWidth: width,
    paddingBottom: 0,
    paddingTop: 0,
    position: 'relative',
    width,
  }),
});
