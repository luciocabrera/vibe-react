import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    overflow: 'visible',
    position: 'relative',
  },
  label: {
    boxSizing: 'border-box',
    display: 'flex',
    maxWidth: '100%',
    position: 'relative',
    width: '100%',
  },
  triggerButton: {
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    flex: '1 1 auto',
    marginRight: '8px',
    maxWidth: 'calc(100% - 30px)',
    minWidth: 0,
    overflow: 'hidden',
    padding: '6px 10px',
    textAlign: 'left',
    userSelect: 'none',
    width: '100%',
  },
  selectedItemsDisplay: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  resetButton: {
    flex: '0 0 auto',
  },
  dropdownList: {
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    boxSizing: 'border-box',
    maxHeight: 220,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '4px 0',
    position: 'fixed',
    zIndex: 9999,
  },
  dropdownLabel: {
    borderBottom: '1px solid #eee',
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 4,
    overflow: 'hidden',
    padding: '4px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  dropdownOption: {
    display: 'block',
    overflow: 'hidden',
    padding: '4px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const dynamicStyles = {
  container: (accordionWidth: number | null) => ({
    maxWidth: accordionWidth ? `${accordionWidth - 20}px` : '100%',
    width: accordionWidth ? `${accordionWidth - 20}px` : '100%',
  }),
  dropdownList: (left: string, top: string, width: string) => ({
    left,
    top,
    width,
  }),
};

