import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  addButton: {
    padding: '6px 16px',
  },
  columnItem: {
    alignItems: 'center',
    background: '#f7faff',
    border: '1px solid #c7d6f7',
    borderRadius: 6,
    cursor: 'grab',
    display: 'flex',
    fontWeight: 500,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 6,
    padding: '8px 14px',
    transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
  },
  columnItemContent: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  columnItemDragging: {
    background: '#ddeeff',
    boxShadow: '0 2px 8px #1976d244',
    opacity: 0.7,
  },
  columnList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  columnSelect: {
    marginLeft: 8,
    minWidth: 180,
  },
  container: {
    // Container for the entire section
  },
  controlsContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
  },
  directionButton: {
    background: 'transparent',
    border: 'none',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: '1.1em',
    padding: '4px 8px',
  },
  dragIcon: {
    color: '#1976d2',
    fontSize: '1.2em',
  },
  moveButton: {
    background: 'transparent',
    border: 'none',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: '0.9em',
    lineHeight: '1',
    padding: '2px 4px',
  },
  moveButtonDisabled: {
    color: '#ccc',
    cursor: 'default',
  },
  moveButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    color: '#ff4444',
    cursor: 'pointer',
    fontSize: '1.1em',
    marginLeft: 8,
    padding: '4px 8px',
  },
});

