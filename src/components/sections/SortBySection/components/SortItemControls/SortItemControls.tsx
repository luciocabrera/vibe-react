import * as stylex from '@stylexjs/stylex';

import { Button } from '@/components/Button';

import { styles } from './SortItemControls.stylex';
import type { TSortItemControlsProps } from './SortItemControls.types';

const SortItemControls = ({
  direction,
  onDelete: handleDelete,
  onToggleDirection: handleToggleDirection,
}: TSortItemControlsProps) => (
  <div {...stylex.props(styles.container)}>
    <Button
      size='sm'
      title={direction === 'asc' ? 'Ascending' : 'Descending'}
      variant='inverted'
      onClick={handleToggleDirection}
    >
      {direction === 'asc' ? '▲' : '▼'}
    </Button>
    <Button
      size='sm'
      title='Remove'
      variant='inverted'
      onClick={handleDelete}
    >
      X
    </Button>
  </div>
);
export default SortItemControls;