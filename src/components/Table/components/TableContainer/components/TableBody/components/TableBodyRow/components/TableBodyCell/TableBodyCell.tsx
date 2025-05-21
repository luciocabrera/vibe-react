import * as stylex from '@stylexjs/stylex';
import { flexRender } from '@tanstack/react-table';

import { styles as headerStyles } from '@/components/Table/components/TableContainer/styles.stylex';

import { styles } from './TableBodyCell.stylex';
import type { TTableBodyCellProps } from './TableBodyCell.types';
import { getCommonPiningStyles, renderCell } from './utils';

const TableBodyCell = <TData extends Record<string, unknown>>({
  cell,
}: TTableBodyCellProps<TData>) => {
  // Function to get the cell component when it is not aggregated
  const getNotAggregatedCell = () =>
    cell.getIsPlaceholder()
      ? null // For cells with repeated values, render null
      : // Otherwise, just render the regular cell
        flexRender(renderCell({ cell }), cell.getContext());

  // Function to get the cell component when it is not grouped
  const getNotGroupedCell = () =>
    cell.getIsAggregated()
      ? // If the cell is aggregated, use the Aggregated renderer for cell
        flexRender(renderCell({ cell }), cell.getContext())
      : getNotAggregatedCell();

  const {
    isFirstRightPinnedColumn,
    isLastLeftPinnedColumn,
    isPinned,
    left,
    right,
  } = getCommonPiningStyles(cell.column);

  return (
    <td
      key={cell.id}
      {...stylex.props(
        styles.td(cell.column.getSize()),
        isPinned ? headerStyles.isPinned : headerStyles.isNotPinned,
        !left && headerStyles.left(left),
        !right && headerStyles.right(right),
        isFirstRightPinnedColumn && headerStyles.isFirstRightPinnedColumn,
        isLastLeftPinnedColumn && headerStyles.isLastLeftPinnedColumn
      )}
    >
      {getNotGroupedCell()}
    </td>
  );
};
export default TableBodyCell;
