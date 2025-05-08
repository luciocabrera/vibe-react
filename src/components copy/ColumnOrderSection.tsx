import React from 'react';
import type { ColumnDef } from '../App';

interface ColumnOrderSectionProps {
  columns: ColumnDef[];
  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
}

export const ColumnOrderSection: React.FC<ColumnOrderSectionProps> = ({
  columns,
  columnOrder,
  setColumnOrder,
}) => {
  const [dragColIdx, setDragColIdx] = React.useState<number | null>(null);
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
            }}
          >
            <span style={{ color: '#1976d2', fontSize: '1.2em' }}>≡</span>
            {col.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

