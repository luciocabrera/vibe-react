import { useState } from 'react';

import { DraggableList } from '../DraggableList';
import type { TDraggableItemType } from '../DraggableList/DraggableList.types';

import type { TSortBySectionProps, TSortCol } from './SortBySection.types';
import { SortItemControls } from './SortControls';

const SortBySection = ({
  allColumns,
  onChange,
  sortState,
}: TSortBySectionProps) => {
  const [selected, setSelected] = useState('');

  const addColumn = () => {
    if (selected && !sortState.find(s => s.key === selected)) {
      const col = allColumns.find(c => c.key === selected);
      if (col)
        onChange([
          ...sortState,
          { dir: 'asc', key: col.key, label: col.label },
        ]);
      setSelected('');
    }
  };

  const toggleDirection = (idx: number) => {
    onChange(
      sortState.map((s, i) =>
        i === idx ? { ...s, dir: s.dir === 'asc' ? 'desc' : 'asc' } : s
      )
    );
  };

  const removeItem = (idx: number) => {
    onChange(sortState.filter((_, i) => i !== idx));
  };

  const draggableItems = () =>
    sortState.map((col, idx) => ({
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
            onDelete={() => removeItem(idx)}
            onToggleDirection={() => toggleDirection(idx)}
          />
        </div>
      ),
      id: `${col.key}-${idx}`,
    }));

  const handleOrderChange = (items: TDraggableItemType[]) => {
    // Create a new array based on the original order but rearranged
    const newSortItems: TSortCol[] = [];

    // Map each draggable item back to its original sort item
    items.forEach(item => {
      const idParts = item.id.toString().split('-');
      const key = idParts[0];
      const originalItem = sortState.find(s => s.key === key);
      if (originalItem) {
        newSortItems.push(originalItem);
      }
    });

    onChange(newSortItems);
  };

  return (
    <div className='sort-section'>
      <label htmlFor='sort-column-select'>
        <b>Sort by:</b>
      </label>
      <select
        id='sort-column-select'
        style={{ marginLeft: 8, minWidth: 180 }}
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value=''>Select column</option>
        {allColumns
          .filter(
            c => c.sortable !== false && !sortState.find(s => s.key === c.key)
          )
          .map(col => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
      </select>
      <button style={{ padding: '6px 16px' }} type='button' onClick={addColumn}>
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

