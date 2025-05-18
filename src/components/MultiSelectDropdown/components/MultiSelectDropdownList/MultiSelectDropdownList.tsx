import { useId, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { MultiSelectDropdownListBody } from './components/MultiSelectDropdownListBody';
import { MultiSelectDropdownListFooter } from './components/MultiSelectDropdownListFooter';
import { MultiSelectDropdownListHeader } from './components/MultiSelectDropdownListHeader';
import { styles } from './MultiSelectDropdownList.stylex';
import type { TMultiSelectDropdownListProps } from './MultiSelectDropdownList.types';

const MultiSelectDropdownList = ({
  onChange: handleChange,
  onClose: handleClose,
  options = [],
  selected = [],
}: TMultiSelectDropdownListProps) => {
  const instanceId = useId();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => setSearch('');

  return (
    <div
      data-instance-id={instanceId}
      {...stylex.props(styles.container)}
    >
      <MultiSelectDropdownListHeader
        search={search}
        onReset={handleReset}
        onSearchChange={handleSearch}
      />
      <MultiSelectDropdownListBody
        instanceId={instanceId}
        options={options}
        search={search}
        selected={selected}
        onChange={handleChange}
      />
      <MultiSelectDropdownListFooter onClose={handleClose} />
    </div>
  );
};

export default MultiSelectDropdownList;
