import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  center: {
    textAlign: 'center',
  },
  span: {
    overflow: 'hidden',
    padding: '0 6px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '-webkit-fill-available',
  },
});
