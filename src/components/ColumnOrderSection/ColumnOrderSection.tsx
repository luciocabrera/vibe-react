import { useState } from 'react';
import type { ColumnOrderSectionProps } from './ColumnOrderSection.types';

const ColumnOrderSection = ({
  columns,
  columnOrder,
  setColumnOrder,
  visibleColumns = new Set(columnOrder),
  setVisibleColumns = () => {},
}: ColumnOrderSectionProps) => {
  const [dragColIdx, setDragColIdx] = useState<number | null>(null);
  const orderedColumns = columnOrder
    .map(key => columns.find(col => col.key === key)!)
    .filter(Boolean);

  function handleColDragStart(idx: number) {
    setDragColIdx(idx);
  }
  function handleColDragOver(idx: number, e: React.DragEvent) {
    e.preventDefault();
  }
  function handleColDrop(idx: number) {
    if (dragColIdx === null || dragColIdx === idx) return;
    const newOrder = [...columnOrder];
    const [removed] = newOrder.splice(dragColIdx, 1);
    newOrder.splice(idx, 0, removed);
    setColumnOrder(newOrder);
    setDragColIdx(null);
  }

  function toggleColumnVisibility(key: string) {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(key)) {
      newVisibleColumns.delete(key);
    } else {
      newVisibleColumns.add(key);
    }
    setVisibleColumns(newVisibleColumns);
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Column Order</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {orderedColumns.map((col, idx) => (
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
              {col.label}
            </div>
            <label
              className='toggle-switch'
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <input
                type='checkbox'
                checked={visibleColumns.has(col.key)}
                onChange={() => toggleColumnVisibility(col.key)}
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  height: 0,
                  width: 0,
                }}
              />
              <span
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '40px',
                  height: '20px',
                  background: visibleColumns.has(col.key) ? '#1976d2' : '#ccc',
                  borderRadius: '10px',
                  transition: 'background 0.3s',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '""',
                    height: '16px',
                    width: '16px',
                    left: visibleColumns.has(col.key) ? '22px' : '2px',
                    bottom: '2px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'left 0.3s',
                  }}
                />
              </span>
              <small
                style={{ marginLeft: '8px', fontSize: '0.8em', color: '#666' }}
              >
                {visibleColumns.has(col.key) ? 'Show' : 'Hide'}
              </small>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColumnOrderSection;

