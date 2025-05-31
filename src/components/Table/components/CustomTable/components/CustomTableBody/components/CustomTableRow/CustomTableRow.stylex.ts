import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  evenRow: {
    backgroundColor: '#ffffff',
  },

  oddRow: {
    backgroundColor: '#f9fafb',
  },

  paddingCell: (width: number) => ({
    backgroundColor: 'transparent',
    border: 'none',
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
    padding: 0,
    width: `${width}px`,
  }),

  row: (translateY: number) => ({
    borderBottom: '1px solid #f3f4f6',
    height: '32px',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transform: `translateY(${translateY}px)`,
    width: '100%',
  }),
});
