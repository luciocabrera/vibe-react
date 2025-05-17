import * as stylex from '@stylexjs/stylex';

import { DrawerControls } from '../DrawerControls';

import { styles } from './DrawerHeader.stylex';
import type { TDrawerHeaderProps } from './DrawerHeader.types';

const DrawerHeader = ({
  isPinned = false,
  onClose: handleClose,
  onPinChange: handlePinClick,
  title,
}: TDrawerHeaderProps) => (
  <header {...stylex.props(styles.header)}>
    <h2 {...stylex.props(styles.title)}>{title}</h2>
    <DrawerControls
      isPinned={isPinned}
      onCLose={handleClose}
      onTogglePin={handlePinClick}
    />
  </header>
);

export default DrawerHeader;
