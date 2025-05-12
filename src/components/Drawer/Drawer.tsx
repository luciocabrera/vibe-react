import * as stylex from "@stylexjs/stylex";

import { styles } from "./Drawer.stylex";
import type { TDrawerProps } from "./Drawer.types";

const Drawer = ({
  children,
  isPinned = false,
  onClose,
  onPinChange,
  open,
}: TDrawerProps) => {
  if (!open) return null;

  const handlePinClick = () => onPinChange?.(!isPinned);

  const handleClose = () => onClose();
  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") onClose();
  };

  return (
    <>
      {!isPinned && (
        <div
          aria-label="Close settings panel"
          role="button"
          tabIndex={0}
          {...stylex.props(styles.backdrop)}
          onClick={handleClose}
          onKeyDown={handleBackdropKeyDown}
        />
      )}
      <aside {...stylex.props(styles.drawer, isPinned && styles.drawerPinned)}>
        <div {...stylex.props(styles.header)}>
          <span {...stylex.props(styles.title)}>Table Settings</span>
          <div {...stylex.props(styles.buttonContainer)}>
            <button
              {...stylex.props(styles.pinButton)}
              title={isPinned ? "Unpin drawer" : "Pin drawer"}
              onClick={handlePinClick}
            >
              {isPinned ? "📌" : "📍"}
            </button>
            <button
              {...stylex.props(styles.closeButton)}
              title="Close"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>
        {children}
      </aside>
    </>
  );
};

export default Drawer;
