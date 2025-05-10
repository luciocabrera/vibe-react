import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  badge: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '16px',
    color: '#333',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 500,
    gap: '0.5rem',
    padding: '4px 1rem 4px 1rem',
  },
  more: {
    backgroundColor: '#e0e0e0',
  },
  removeButton: {
    ':hover': {
      color: 'red',
    },
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: 1,
    marginLeft: '4px',
    padding: '0 4px',
  },
});

