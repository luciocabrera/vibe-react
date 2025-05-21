import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    flex: 1,
    maxHeight: '100cqh',
    overflow: 'auto',
    position: 'relative',
  },
  table: {
    display: 'grid',
  },
});
