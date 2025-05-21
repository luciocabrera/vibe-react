import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  span: {
    marginRight: '6px',
    overflow: 'hidden',
    textAlign: 'right',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
});
