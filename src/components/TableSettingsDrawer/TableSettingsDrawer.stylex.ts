import * as stylex from '@stylexjs/stylex';

import { spacing } from '@/styles/tokens.stylex';

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
    gap: spacing.sm, // 8px
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5em',
    padding: `${spacing.none} ${spacing.sm}`,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.md, // 12px
  },
  drawer: {
    background: '#fff',
    boxShadow: '-2px 0 12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '90vw',
    position: 'fixed',
    right: 0,
    top: 0,
    transition: 'transform 0.3s ease',
    width: '400px',
    zIndex: 10001,
  },
  drawerPinned: {
    background: '#fff',
    borderLeft: '1px solid #eee',
    bottom: 'unset',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    left: 'unset',
    maxWidth: '370px',
    minWidth: '370px',
    position: 'fixed',
    right: 0,
    top: 0,
    transition: 'none',
    width: '370px',
    zIndex: 10001,
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
    background: '#f7faff',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
    fontSize: '1.1em',
    fontWeight: 500,
    padding: '12px 0',
    textAlign: 'center',
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
