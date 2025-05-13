import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  input: {
    ':focus-visible': {
      border: 'none',
      outline: 'none',
    },
    background: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--text-color-1)',
    inset: 'unset',
    lineHeight: '18px',
    outline: 'none',
    paddingBottom: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    position: 'relative',
    top: '-1px',
    width: '100%',
  },
});
