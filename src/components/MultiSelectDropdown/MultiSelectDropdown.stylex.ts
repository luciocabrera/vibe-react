import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    display: 'inline-block',
    marginRight: 16,
    minWidth: 160,
    position: 'relative',
  },
  dropdown: {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer',
    marginLeft: 6,
    minWidth: 120,
    padding: '6px 10px',
    textAlign: 'left',
  },
  menu: {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    boxShadow: '0 2px 8px #0002',
    marginTop: 2,
    maxHeight: 220,
    minWidth: 180,
    overflowY: 'auto',
    position: 'absolute',
    zIndex: 10,
  },
  optionLabel: {
    display: 'block',
    padding: '4px 10px',
  },
  resetButton: {
    marginLeft: 4,
  },
  selectAllLabel: {
    borderBottom: '1px solid #eee',
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 4,
    padding: '4px 10px',
  },
});

