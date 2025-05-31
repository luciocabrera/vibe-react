import * as stylex from '@stylexjs/stylex';

import type {
  TCustomTableRowProps,
  TProcessedColumn,
} from '../../../../CustomTable.types';

import { CustomTableCell } from './components/CustomTableCell';
import { styles } from './CustomTableRow.stylex';

const CustomTableRow = ({
  columns,
  leftPinnedWidth,
  rightPinnedWidth,
  rowData,
  rowIndex,
  rowVirtualizer: _rowVirtualizer,
  virtualRow,
}: TCustomTableRowProps) => {
  // Calculate column positions for pinning (similar to header)
  const columnsWithPositions = columns.map(
    (column: TProcessedColumn, index: number) => {
      let position: number | null = null;

      if (column.isLeftPinned) {
        // Calculate left position by summing widths of previous left pinned columns
        position = columns
          .slice(0, index)
          .filter((col: TProcessedColumn) => col.isLeftPinned)
          .reduce((sum: number, col: TProcessedColumn) => sum + col.width, 0);
      } else if (column.isRightPinned) {
        // Calculate right position by summing widths of subsequent right pinned columns
        position = columns
          .slice(index + 1)
          .filter((col: TProcessedColumn) => col.isRightPinned)
          .reduce((sum: number, col: TProcessedColumn) => sum + col.width, 0);
      }

      return { column, position };
    }
  );

  return (
    <tr
      data-index={virtualRow.index}
      {...stylex.props(
        styles.row(virtualRow.start),
        rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
      )}
    >
      {columnsWithPositions.map(
        ({
          column,
          position,
        }: {
          column: TProcessedColumn;
          position: number | null;
        }) => (
          <CustomTableCell
            key={column.key}
            column={column}
            leftPinnedWidth={leftPinnedWidth}
            position={position}
            rightPinnedWidth={rightPinnedWidth}
            rowData={rowData}
            value={rowData[column.key]}
          />
        )
      )}
    </tr>
  );
};

export default CustomTableRow;
