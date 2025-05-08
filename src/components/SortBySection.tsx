import React, { useState } from 'react';
import type { ColumnDef } from '../App';

export type SortCol = {
  key: string;
  label: string;
  dir: 'asc' | 'desc';
};

export interface SortBySectionProps {
  allColumns: ColumnDef[];
  sortState: SortCol[];
  onChange: (newSort: SortCol[]) => void;
}

export const SortBySection: React.FC<SortBySectionProps> = ({
  allColumns,
  sortState,
  onChange,
}) => {
  const [selected, setSelected] = useState('');

  const addColumn = () => {
    if (selected && !sortState.find(s => s.key === selected)) {
      const col = allColumns.find(c => c.key === selected);
      if (col)
        onChange([
          ...sortState,
          { key: col.key, label: col.label, dir: 'asc' },
        ]);
      setSelected('');
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= sortState.length) return;
    const arr = [...sortState];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange(arr);
  };

  const handleDrag = (from: number, to: number) => {
    move(from, to);
  };

  return (
    <div className='sort-section'>
      <label>
        <b>Sort by:</b>
      </label>
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        style={{ minWidth: 180, marginLeft: 8 }}
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
      <button type='button' onClick={addColumn} style={{ padding: '6px 16px' }}>
        Add
      </button>
      <div className='sort-list'>
        {sortState.map((col, idx) => (
          <div
            key={col.key}
            className='sort-item'
            draggable
            onDragStart={e =>
              e.dataTransfer.setData('text/plain', idx.toString())
            }
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const from = Number(e.dataTransfer.getData('text/plain'));
              handleDrag(from, idx);
            }}
          >
            <span style={{ marginRight: 8, cursor: 'grab' }}>≡</span>
            <span style={{ marginRight: 8 }}>{col.label}</span>
            <button
              type='button'
              onClick={() =>
                onChange(
                  sortState.map((s, i) =>
                    i === idx
                      ? { ...s, dir: s.dir === 'asc' ? 'desc' : 'asc' }
                      : s
                  )
                )
              }
              style={{ marginRight: 8 }}
            >
              {col.dir === 'asc' ? '▲' : '▼'}
            </button>
            <button
              type='button'
              onClick={() => move(idx, idx - 1)}
              disabled={idx === 0}
            >
              ↑
            </button>
            <button
              type='button'
              onClick={() => move(idx, idx + 1)}
              disabled={idx === sortState.length - 1}
            >
              ↓
            </button>
            <button
              type='button'
              onClick={() => onChange(sortState.filter((_, i) => i !== idx))}
              style={{ marginLeft: 8 }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

