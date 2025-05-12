import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
badge: {
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '16px',
  color: '#333',
  display: 'inline-flex',
  flexBasis: 'auto',
  flexShrink: 1,
  fontSize: '12px',
  fontWeight: 500,
  gap: '0.5rem',
  maxWidth: '100%',
  minWidth: 0,
  overflow: 'hidden',
  padding: '4px 1rem',
  width: 'fit-content',     // ✅ THIS is the key fix
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
  value: {
  display: 'block',
  flexGrow: 1,
  flexShrink: 1,
  maxWidth: '100%',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
},
});

