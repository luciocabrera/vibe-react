import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  paddingCell: (width) => ({
    display: 'flex',
    width,
  }),
  row: (translateY) => ({
    display: 'flex',
    position: 'absolute',
    transform: `translateY(${translateY}px)`,
    width: '100%',
  }),
});
