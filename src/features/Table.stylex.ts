import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  app: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  button: {
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px',
    padding: '8px 16px',
  },
  infoText: {
    margin: '4px 0',
  },
  notice: {
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    color: '#555',
    marginBottom: '8px',
    padding: '8px',
  },
});
