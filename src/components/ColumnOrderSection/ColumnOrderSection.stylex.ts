import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
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
    opacity: 1,
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
  dragIcon: {
    color: '#1976d2',
    fontSize: '1.2em',
  },
  title: {
    marginTop: 0,
  },
  toggleInput: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  toggleLabel: {
    color: '#666',
    fontSize: '0.8em',
    marginLeft: '8px',
  },
  toggleSwitch: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  toggleThumb: {
    background: 'white',
    borderRadius: '50%',
    bottom: '2px',
    content: '""',
    height: '16px',
    position: 'absolute',
    transition: 'left 0.3s',
    width: '16px',
  },
  toggleThumbActive: {
    left: '22px',
  },
  toggleThumbInactive: {
    left: '2px',
  },
  toggleTrack: {
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-block',
    height: '20px',
    position: 'relative',
    transition: 'background 0.3s',
    width: '40px',
  },
  toggleTrackActive: {
    background: '#1976d2',
  },
  toggleTrackInactive: {
    background: '#ccc',
  },
});

