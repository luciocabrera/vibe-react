import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient( 50deg, var(--background-color-1) 0%, var(--background-color-10) 50%)',
    borderBottom: '1px solid var(--color-border-2)',
    borderTop: '1px solid var(--color-border-2)',
    color: 'var(--text-color-1)',
    display: 'flex',
    flexWrap: 'nowrap',
    fontSize: '0.9375rem',
    fontWeight: '500',
    height: '18px',
    justifyContent: 'space-between',
    letterSpacing: '1px',
    padding: '10px',
    width: 'auto',
  },
  inverse: {
    background: 'transparent',
    color: 'var(--background-color-1)',
  },
  radius: {
    border: 'none',
    borderTopLeftRadius: 'var(--border-radius-lg)',
    borderTopRightRadius: 'var(--border-radius-lg)',
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '1rem',
  },
  toolbar: {
    display: 'flex',
    gap: '1rem',
  },
});
