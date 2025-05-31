import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  cell: (width: number) => ({
    backgroundColor: 'inherit',
    borderRight: '1px solid #f3f4f6',
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
    padding: 0,
    width: `${width}px`,
  }),

  cellContent: {
    alignItems: 'center',
    display: 'flex',
    height: '32px',
    overflow: 'hidden',
    paddingLeft: '8px',
    paddingRight: '8px',
  },

  cellText: {
    color: '#374151',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },

  leftPinned: (left: number) => ({
    backgroundColor: '#fff',
    left: `${left}px`,
    position: 'sticky',
    zIndex: 1,
  }),

  numberCell: {
    textAlign: 'right',
  },

  rightPinned: (right: number) => ({
    backgroundColor: '#fff',
    position: 'sticky',
    right: `${right}px`,
    zIndex: 1,
  }),
});
