import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { DraggableList } from '../DraggableList';
import type { TDraggableItemType } from '../DraggableList/DraggableList.types';
import { SortItemControls } from '../SortItemControls';

import { styles } from './SortBySection.stylex';
import type { TSortBySectionProps, TSortCol } from './SortBySection.types';
import { FormFieldBase } from '../FormFieldBase';

const SortBySection = ({
  allColumns,
  onChange,
  sortState,
}: TSortBySectionProps) => {
  const [selected, setSelected] = useState('');

  const handleAddColumn = () => {
    if (selected && !sortState.find((s) => s.key === selected)) {
      const col = allColumns.find((c) => c.key === selected);
      if (col)
        onChange([
          ...sortState,
          { dir: 'asc', key: col.key, label: col.label },
        ]);
      setSelected('');
    }
  };

  const handleToggleDirection = (idx: number) => {
    onChange(
      sortState.map((s, i) =>
        i === idx ? { ...s, dir: s.dir === 'asc' ? 'desc' : 'asc' } : s
      )
    );
  };

  const handleDelete = (idx: number) => {
    onChange(sortState.filter((_, i) => i !== idx));
  };

  const draggableItems = sortState.map((col, idx) => ({
    child: (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
          <span>{col.label}</span>
        </div>
        <SortItemControls
          direction={col.dir}
          onDelete={() => handleDelete(idx)}
          onToggleDirection={() => handleToggleDirection(idx)}
        />
      </div>
    ),
    id: `${col.key}-${idx}`,
  }));

  const handleOrderChange = (items: TDraggableItemType[]) => {
    // Create a new array based on the original order but rearranged
    const newSortItems: TSortCol[] = [];

    // Map each draggable item back to its original sort item
    items.forEach((item) => {
      const idParts = item.id.toString().split('-');
      const key = idParts[0];
      const originalItem = sortState.find((s) => s.key === key);
      if (originalItem) {
        newSortItems.push(originalItem);
      }
    });

    onChange(newSortItems);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
  };

  return (
    <div {...stylex.props(styles.container)}>
      {/* <label htmlFor='sort-column-select'>
        <b>Sort by:</b>
      </label> */}
      <FormFieldBase
        accessor='sort-column-select'
        htmlFor='sort-column-select'
        label='Sort by'
      >
        <select
          id='sort-column-select'
          {...stylex.props(styles.columnSelect)}
          value={selected}
          onChange={handleSelectChange}
        >
          <option value=''>Select column</option>
          {allColumns
            .filter(
              (c) =>
                c.sortable !== false && !sortState.find((s) => s.key === c.key)
            )
            .map((col) => (
              <option
                key={col.key}
                value={col.key}
              >
                {col.label}
              </option>
            ))}
        </select>
      </FormFieldBase>

      <button
        {...stylex.props(styles.addButton)}
        type='button'
        onClick={handleAddColumn}
      >
        Add
      </button>

      {draggableItems.length > 0 && (
        <DraggableList
          items={draggableItems}
          onOrderChange={handleOrderChange}
        />
      )}
    </div>
  );
};

export default SortBySection;
