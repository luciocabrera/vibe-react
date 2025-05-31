import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  body: (totalSize: number) => ({
    height: `${totalSize}px`,
    position: 'relative',
  }),
});
