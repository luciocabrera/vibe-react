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
  const orderedColumns = columnOrder
    .map(key => columns.find(col => col.key === key))
    .filter((col): col is (typeof columns)[number] => Boolean(col));

  const handleOnToggle = (key: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(key)) {
      newVisibleColumns.delete(key);
    } else {
      newVisibleColumns.add(key);
    }
    setVisibleColumns(newVisibleColumns);
  };

  const draggableItems = orderedColumns.map(col => ({
    child: (
      <ColumnToggle
        id={col.key}
        isVisible={visibleColumns.has(col.key)}
        label={col.label}
        onToggle={handleOnToggle}
      />
    ),
    id: col.key,
  }));

  const handleOrderChange = (items: TDraggableItemType[]) => {
    const newOrder = items.map(item => item.id.toString());
    setColumnOrder(newOrder);
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Column Order</h3>
      <DraggableList items={draggableItems} onOrderChange={handleOrderChange} />
    </div>
  );
};

export default ColumnOrderSection;

