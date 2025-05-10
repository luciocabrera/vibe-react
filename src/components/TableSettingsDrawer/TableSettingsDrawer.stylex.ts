import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  // Drawer styling
  backdrop: {
    background: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 10000,
  },
  buttonContainer: {
    display: 'flex',
    gap: '8px',
  },
  
  content: {
    overflowY: 'auto',
    flex: 1,
    padding: '16px',
  },
  
closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5em',
    padding: '0 8px',
  },
  
drawer: {
    background: '#fff',
    boxShadow: '-2px 0 12px rgba(0, 0, 0, 0.15)',
    maxWidth: '90vw',
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    right: 0,
    height: '100vh',
    top: 0,
    transition: 'transform 0.3s ease',
    width: '400px',
    zIndex: 10001,
  },
  // Pinned drawer styles
drawerPinned: {
    borderLeft: '1px solid #eee',
    boxShadow: 'none',
    height: '100vh',
    maxWidth: '370px',
    minWidth: '370px',
    position: 'relative',
    width: '370px',
  },
  header: {
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 16px',
  },
  pinButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2em',
    padding: '4px 8px',
  },
  tab: {
    cursor: 'pointer',
    background: '#f7faff',
    flex: 1,
    border: 'none',
    padding: '12px 0',
    fontSize: '1.1em',
    textAlign: 'center',
    fontWeight: 500,
    transition: 'background 0.2s',
  },
  tabActive: {
    background: '#fff',
    borderBottom: '2px solid #1976d2',
    color: ' #1976d2',
  },
  tabs: {
    borderBottom: '1px solid #eee',
    display: 'flex',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 600,
  },
});

