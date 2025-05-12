import { useEffect, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { styles } from './Drawer.stylex';
import type { TDrawerProps } from './Drawer.types';

const Drawer = ({
  children,
  isPinned = false,
  onClose,
  onPinChange,
  open,
}: TDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // Save the previously focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    // Focus the drawer
    drawerRef.current?.focus();
    // Trap focus inside the drawer
    const handleTab = (e: KeyboardEvent) => {
      const focusableEls = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableEls || focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      // Restore focus to the previously focused element
      previouslyFocusedElement.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePinClick = () => onPinChange?.(!isPinned);

  const handleClose = () => onClose();
  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };

  return (
    <>
      {!isPinned && (
        <div
          aria-label='Close settings panel'
          role='button'
          tabIndex={0}
          {...stylex.props(styles.backdrop)}
          onClick={handleClose}
          onKeyDown={handleBackdropKeyDown}
        />
      )}
      <aside
        {...stylex.props(styles.drawer, isPinned && styles.drawerPinned)}
        ref={drawerRef}
        aria-labelledby='drawer-title'
        aria-modal='true'
        role='dialog'
        tabIndex={-1}
      >
        <header {...stylex.props(styles.header)}>
          <h2
            id='drawer-title'
            {...stylex.props(styles.title)}
          >
            Table Settings
          </h2>
          <div {...stylex.props(styles.buttonContainer)}>
            <button
              {...stylex.props(styles.pinButton)}
              title={isPinned ? 'Unpin drawer' : 'Pin drawer'}
              onClick={handlePinClick}
            >
              {isPinned ? '📌' : '📍'}
            </button>
            <button
              {...stylex.props(styles.closeButton)}
              title='Close'
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </header>
        {children}
      </aside>
    </>
  );
};

export default Drawer;
