import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  sortable: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  th: (width) => ({
    display: 'flex',
    width,
  }),
});
