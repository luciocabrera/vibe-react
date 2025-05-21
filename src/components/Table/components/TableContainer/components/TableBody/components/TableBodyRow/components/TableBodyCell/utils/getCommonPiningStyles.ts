import type { Column } from '@tanstack/react-table';

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
export const getCommonPiningStyles = <TData>(column: Column<TData>) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');
  const left = isPinned === 'left' ? column.getStart('left') : undefined;
  const right = isPinned === 'right' ? column.getAfter('right') : undefined;

  return {
    isFirstRightPinnedColumn,
    isLastLeftPinnedColumn,
    isPinned,
    left,
    right,
  };
};
