import * as stylex from '@stylexjs/stylex';

import { Button } from '@/components/Button';

import { styles } from './DrawerControls.stylex';
import type { TDrawerControlsProps } from './DrawerControls.types';

const DrawerControls = ({
  isPinned,
  onCLose: handleClose,
  onTogglePin: handlePinClick,
}: TDrawerControlsProps) => (
  <div {...stylex.props(styles.container)}>
    <Button
      size='sm'
      title={isPinned ? 'Unpin drawer' : 'Pin drawer'}
      variant='inverted'
      onClick={handlePinClick}
    >
      {isPinned ? '📌' : '📍'}
    </Button>
    <Button
      size='sm'
      title='Close'
      variant='inverted'
      onClick={handleClose}
    >
      x
    </Button>
  </div>
);
export default DrawerControls;
