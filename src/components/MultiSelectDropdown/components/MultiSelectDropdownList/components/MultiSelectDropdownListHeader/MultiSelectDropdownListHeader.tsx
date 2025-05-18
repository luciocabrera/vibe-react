import * as stylex from '@stylexjs/stylex';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { styles as commonStyles } from '../styles/common.stylex';

import { styles } from './MultiSelectDropdownListHeader.stylex';
import type { TMultiSelectDropdownListHeaderProps } from './MultiSelectDropdownListHeader.types';

const MultiSelectDropdownListHeader = ({
  inputId,
  onReset: handleReset,
  onSearchChange: handleSearchChange,
  search,
}: TMultiSelectDropdownListHeaderProps) => (
  <div {...stylex.props(commonStyles.row, styles.bottomBorder)}>
    <Input
      aria-label='Search options'
      id={inputId}
      placeholder='Search...'
      type='text'
      value={search}
      onChange={handleSearchChange}
    />
    <Button
      aria-label='Reset search'
      size='sm'
      title='Reset'
      variant='ghost'
      onClick={handleReset}
    >
      ⟳
    </Button>
  </div>
);

export default MultiSelectDropdownListHeader;
