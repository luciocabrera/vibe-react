import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  active: { background: '#727f793b' },
  button: {
    ':hover': {
      boxShadow:
        '10px 10px 30px var(--background-color-10), -30px -30px 60px #ffffff',
      opacity: '0.8',
    },
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--background-color-1)',
    cursor: 'pointer',
    fontSize: '15px',
    height: '38px',
    inset: 'unset',
    overflow: 'hidden',
    padding: '0 1rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
});
