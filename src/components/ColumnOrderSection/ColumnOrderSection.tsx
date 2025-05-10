import { useCallback,useMemo } from 'react';

import { ColumnToggle } from '../ColumnToggle';
import { DraggableList } from '../DraggableList';
import type { TDraggableItemType } from '../DraggableList/DraggableList.types';

import type { TColumnOrderSectionProps } from './ColumnOrderSection.types';

const ColumnOrderSection = ({
  columns,
  columnOrder,
  setColumnOrder,
  visibleColumns = new Set(columnOrder),
  setVisibleColumns = () => {},
}: TColumnOrderSectionProps) => {
  const orderedColumns = useMemo(
    () =>
      columnOrder
        .map(key => columns.find(col => col.key === key)!)
        .filter(Boolean),
    [columnOrder, columns]
  );

  const toggleColumnVisibility = useCallback(
    (key: string) => {
      const newVisibleColumns = new Set(visibleColumns);
      if (newVisibleColumns.has(key)) {
        newVisibleColumns.delete(key);
      } else {
        newVisibleColumns.add(key);
      }
      setVisibleColumns(newVisibleColumns);
    },
    [visibleColumns, setVisibleColumns]
  );

  const draggableItems = useMemo(
    () =>
      orderedColumns.map(col => ({
        child: (
          <ColumnToggle
            id={col.key}
            isVisible={visibleColumns.has(col.key)}
            label={col.label}
            onToggle={toggleColumnVisibility}
          />
        ),
        id: col.key,
      })),
    [orderedColumns, toggleColumnVisibility, visibleColumns]
  );

  const handleOrderChange = useCallback(
    (items: TDraggableItemType[]) => {
      const newOrder = items.map(item => item.id.toString());
      setColumnOrder(newOrder);
    },
    [setColumnOrder]
  );

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Column Order</h3>
      <DraggableList items={draggableItems} onOrderChange={handleOrderChange} />
    </div>
  );
};

export default ColumnOrderSection;

