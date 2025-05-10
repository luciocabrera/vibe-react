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
    margin: '0 4px 4px 0',
    padding: '4px 8px',
  },
  more: {
    backgroundColor: '#e0e0e0',
  },
  removeButton: {
    ':hover': {
      color: '#333',
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

