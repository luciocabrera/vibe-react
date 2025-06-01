import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  headerCell: (width: number) => ({
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #e1e5e9',
    boxSizing: 'border-box',
    color: '#374151',
    containerName: 'header-cell',
    containerType: 'normal',

    fontSize: '14px',
    fontWeight: 600,
    height: '32px',
    maxWidth: `${width}px`,
    minWidth: `${width}px`,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    width: `${width}px`,
  }),

  headerContent: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    paddingLeft: '6px',
    paddingRight: '20px', // Account for resize handle (4px) + pin controls space
    position: 'relative',
    width: '100%',
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
    overflow: 'hidden',
  },

  leftPinned: (left: number) => ({
    backgroundColor: '#f8f9fa',
    left: `${left}px`,
    position: 'sticky',
    zIndex: 2,
  }),

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
    flexShrink: 0,
    gap: '2px',
    marginLeft: '4px',
    maxWidth: '60px', // Limit pin controls width
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
    zIndex: 1,
  },

  resizing: {
    backgroundColor: '#e3f2fd',
    userSelect: 'none',
  },

  rightPinned: (right: number) => ({
    backgroundColor: '#f8f9fa',
    position: 'sticky',
    right: `${right}px`,
    zIndex: 2,
  }),

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
