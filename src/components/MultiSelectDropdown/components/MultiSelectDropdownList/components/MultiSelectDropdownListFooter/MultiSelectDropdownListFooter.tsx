import * as stylex from '@stylexjs/stylex';

import { Button } from '@/components/Button';

import { styles as commonStyles } from '../styles/common.stylex';

import { styles } from './MultiSelectDropdownListFooter.stylex';
import type { TMultiSelectDropdownListFooterProps } from './MultiSelectDropdownListFooter.types';

const MultiSelectDropdownListFooter = ({
  onClose: handleClose,
}: TMultiSelectDropdownListFooterProps) => (
  <div {...stylex.props(commonStyles.row, styles.topBorder)}>
    <Button
      aria-label='Close Dropdown'
      size='sm'
      title='Close'
      variant='secondary'
      onClick={handleClose}
    >
      x
    </Button>
  </div>
);

export default MultiSelectDropdownListFooter;
