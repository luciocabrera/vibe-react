import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  dragIcon: {
    color: '#1976d2',
    fontSize: '1.2em',
  },
  labelContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: 10,
  },
  li: {
    background: '#f7faff',
    alignItems: 'center',
    border: '1px solid #c7d6f7',
    borderRadius: 6,
    cursor: 'grab',
    display: 'flex',
    flex: 1,
    fontWeight: 500,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 6,
    opacity: 1,
    padding: '8px 14px',
    transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
  },
  liDragging: {
    background: '#ddeeff',
    boxShadow: '0 2px 8px #1976d244',
    opacity: 0.7,
  },
});

