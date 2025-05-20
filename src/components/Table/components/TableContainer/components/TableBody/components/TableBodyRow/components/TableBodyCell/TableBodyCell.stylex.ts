import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  td: (width) => ({
    display: 'flex',
    width,
  }),
});
