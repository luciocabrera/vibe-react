import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  head: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e1e5e9',
    containerName: 'table-head',
    containerType: 'normal',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },

  // paddingCell: (width: number) => ({
  //   backgroundColor: 'transparent',
  //   border: 'none',
  //   maxWidth: `${width}px`,
  //   minWidth: `${width}px`,
  //   padding: 0,
  //   width: `${width}px`,
  // }),

  row: { display: 'flex', height: '40px' },
});
