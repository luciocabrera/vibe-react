import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  button: {
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--text-color-1)',
    cursor: 'pointer',
    display: 'flex',
    height: '28px',
    justifyContent: 'center',
    padding: '4px',
    transition: 'all 0.2s ease',
    width: '28px',
  },
  buttonHover: {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  icon: {
    height: '20px',
    width: '20px',
  },
});
