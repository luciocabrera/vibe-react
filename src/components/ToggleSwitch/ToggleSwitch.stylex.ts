import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  input: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  label: {
    color: '#666',
    fontSize: '0.8em',
    marginLeft: '8px',
  },
  thumb: (isActive: boolean) => ({
    background: 'white',
    borderRadius: '50%',
    bottom: '2px',
    content: '""',
    height: '16px',
    left: isActive ? '22px' : '2px',
    position: 'absolute',
    transition: 'left 0.3s',
    width: '16px',
  }),
  track: (isActive: boolean) => ({
    background: isActive ? '#1976d2' : '#ccc',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-block',
    height: '20px',
    position: 'relative',
    transition: 'background 0.3s',
    width: '40px',
  }),
});
