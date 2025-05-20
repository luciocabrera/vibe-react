import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  body: (height) => ({
    display: 'grid',
    height,
    position: 'relative',
  }),
});
