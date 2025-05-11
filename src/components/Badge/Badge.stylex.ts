import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
badge: {
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '16px',
  color: '#333',
  fontSize: '12px',
  fontWeight: 500,
  gap: '0.5rem',
  padding: '4px 1rem',
  overflow: 'hidden',
  minWidth: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  width: 'fit-content',
  maxWidth: '100%',     // ✅ THIS is the key fix
},

value: {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minWidth: 0,
  flexGrow: 1,
  flexShrink: 1,
  maxWidth: '100%',
  display: 'block',
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

