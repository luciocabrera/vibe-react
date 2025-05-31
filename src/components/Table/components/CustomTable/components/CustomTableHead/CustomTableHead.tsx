import * as stylex from '@stylexjs/stylex';

import type { TCustomTableHeadProps } from '../../CustomTable.types';

import { CustomTableHeaderCell } from './components/CustomTableHeaderCell';
import { styles } from './CustomTableHead.stylex';

const CustomTableHead = ({
  columns,
  leftPinnedWidth,
  onColumnPin,
  onColumnResize,
  onSort,
  rightPinnedWidth,
  sortState,
}: TCustomTableHeadProps) => {
  // Create handle functions to satisfy linting rules
  const handleColumnPin = onColumnPin;
  const handleColumnResize = onColumnResize;
  const handleSort = onSort;

  // Calculate column positions for pinning
  const columnsWithPositions = columns.map((column, index) => {
    let position = null;

    if (column.isLeftPinned) {
      // Calculate left position by summing widths of previous left pinned columns
      position = columns
        .slice(0, index)
        .filter((col) => col.isLeftPinned)
        .reduce((sum, col) => sum + col.width, 0);
    } else if (column.isRightPinned) {
      // Calculate right position by summing widths of subsequent right pinned columns
      position = columns
        .slice(index + 1)
        .filter((col) => col.isRightPinned)
        .reduce((sum, col) => sum + col.width, 0);
    }

    return { column, position };
  });

  return (
    <thead {...stylex.props(styles.head)}>
      <tr {...stylex.props(styles.row)}>
        {columnsWithPositions.map(({ column, position }) => (
          <CustomTableHeaderCell
            key={column.key}
            column={column}
            leftPinnedWidth={leftPinnedWidth}
            position={position}
            rightPinnedWidth={rightPinnedWidth}
            sortState={sortState}
            onColumnPin={handleColumnPin}
            onColumnResize={handleColumnResize}
            onSort={handleSort}
          />
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableHead;
