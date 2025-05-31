import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  headerCell: (width: number) => ({
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #e1e5e9',
    color: '#374151',
    fontSize: '14px',
    fontWeight: 600,
    height: '40px',
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
    padding: 0,
    position: 'relative',
    width: `${width}px`,
  }),

  headerContent: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    paddingLeft: '12px',
    paddingRight: '24px',
    position: 'relative',
  },

  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  labelContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    minWidth: 0,
  },

  pinButton: {
    ':hover': {
      backgroundColor: '#e5e7eb',
      color: '#374151',
    },
    background: 'none',
    border: 'none',
    borderRadius: '2px',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '2px 4px',
  },

  pinControls: {
    ':hover': {
      opacity: 1,
    },
    display: 'flex',
    gap: '2px',
    marginLeft: '4px',
    opacity: 0,
    transition: 'opacity 0.2s',
  },

  resizeHandle: {
    ':hover': {
      backgroundColor: '#3b82f6',
    },
    backgroundColor: 'transparent',
    bottom: 0,
    cursor: 'col-resize',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '4px',
  },

  resizing: {
    backgroundColor: '#e3f2fd',
    userSelect: 'none',
  },

  sortable: {
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    cursor: 'pointer',
  },

  sorted: {
    backgroundColor: '#f3f4f6',
  },
});
