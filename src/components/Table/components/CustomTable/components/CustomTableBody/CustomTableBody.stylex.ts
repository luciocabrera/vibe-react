import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  body: (totalSize: number) => ({
    height: `${totalSize}px`,
    position: 'relative',
    transition: 'none', // Disable any transitions to prevent animation issues
  }),
});
