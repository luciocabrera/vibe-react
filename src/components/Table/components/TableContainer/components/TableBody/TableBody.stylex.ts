import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  body: (height) => ({
    color: 'var(--text-color-3)',
    display: 'grid',
    height,
    position: 'relative',
  }),
});
