import React, { useState } from 'react';
import type { ColumnDef } from '../App';

export type SortCol = {
  key: string;
  label: string;
  dir: 'asc' | 'desc';
};

export type SortBySectionProps = {
  allColumns: ColumnDef[];
  sortState: SortCol[];
  onChange: (newSort: SortCol[]) => void;
};

export const SortBySection: React.FC<SortBySectionProps> = ({
  allColumns,
  sortState,
  onChange,
}) => {
  const [selected, setSelected] = useState('');
  const [dragColIdx, setDragColIdx] = useState<number | null>(null);

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

  function handleColDragStart(idx: number) {
    setDragColIdx(idx);
  }

  function handleColDragOver(_idx: number, e: React.DragEvent) {
    e.preventDefault();
  }

  function handleColDrop(idx: number) {
    if (dragColIdx === null || dragColIdx === idx) return;
    const newOrder = [...sortState];
    const [removed] = newOrder.splice(dragColIdx, 1);
    newOrder.splice(idx, 0, removed);
    onChange(newOrder);
    setDragColIdx(null);
  }

  return (
    <div className='sort-section'>
      <label htmlFor='sort-column-select'>
        <b>Sort by:</b>
      </label>
      <select
        id='sort-column-select'
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

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sortState.map((col, idx) => (
          <li
            key={col.key}
            draggable
            onDragStart={() => handleColDragStart(idx)}
            onDragOver={e => handleColDragOver(idx, e)}
            onDrop={() => handleColDrop(idx)}
            style={{
              background: dragColIdx === idx ? '#ddeeff' : '#f7faff',
              border: '1px solid #c7d6f7',
              borderRadius: 6,
              marginBottom: 6,
              padding: '8px 14px',
              cursor: 'grab',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: dragColIdx === idx ? '0 2px 8px #1976d244' : undefined,
              opacity: dragColIdx === idx ? 0.7 : 1,
              transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#1976d2', fontSize: '1.2em' }}>≡</span>
              <span>{col.label}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#1976d2',
                  fontSize: '1.1em',
                  padding: '4px 8px',
                }}
              >
                {col.dir === 'asc' ? '▲' : '▼'}
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button
                  type='button'
                  onClick={() => move(idx, idx - 1)}
                  disabled={idx === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: idx === 0 ? 'default' : 'pointer',
                    color: idx === 0 ? '#ccc' : '#1976d2',
                    fontSize: '0.9em',
                    padding: '2px 4px',
                    lineHeight: '1',
                  }}
                >
                  ↑
                </button>
                <button
                  type='button'
                  onClick={() => move(idx, idx + 1)}
                  disabled={idx === sortState.length - 1}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor:
                      idx === sortState.length - 1 ? 'default' : 'pointer',
                    color: idx === sortState.length - 1 ? '#ccc' : '#1976d2',
                    fontSize: '0.9em',
                    padding: '2px 4px',
                    lineHeight: '1',
                  }}
                >
                  ↓
                </button>
              </div>

              <button
                type='button'
                onClick={() => onChange(sortState.filter((_, i) => i !== idx))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ff4444',
                  fontSize: '1.1em',
                  marginLeft: 8,
                  padding: '4px 8px',
                }}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

