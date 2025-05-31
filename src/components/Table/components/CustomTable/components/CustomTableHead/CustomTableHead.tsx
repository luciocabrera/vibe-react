import * as stylex from '@stylexjs/stylex';

import type { TCustomTableHeadProps } from '../../CustomTable.types';

import { CustomTableHeaderCell } from './components/CustomTableHeaderCell';
import { styles } from './CustomTableHead.stylex';

const CustomTableHead = ({
  columns,
  isPinned,
  onColumnPin,
  onColumnResize,
  onSort,
  sortState,
  virtualColumns,
  virtualPaddingLeft = 0,
  virtualPaddingRight = 0,
}: TCustomTableHeadProps) => {
  // Create handle functions to satisfy linting rules
  const handleColumnPin = onColumnPin;
  const handleColumnResize = onColumnResize;
  const handleSort = onSort;

  return (
    <thead {...stylex.props(styles.head)}>
      <tr {...stylex.props(styles.row)}>
        {/* Virtual padding left for scrollable columns */}
        {virtualPaddingLeft > 0 && (
          <th {...stylex.props(styles.paddingCell(virtualPaddingLeft))} />
        )}

        {/* Render visible columns */}
        {virtualColumns
          ? // Virtualized columns
            virtualColumns.map((virtualColumn) => {
              const column = columns[virtualColumn.index];
              if (!column) return null;

              return (
                <CustomTableHeaderCell
                  key={column.key}
                  column={column}
                  isPinned={isPinned}
                  sortState={sortState}
                  onColumnPin={handleColumnPin}
                  onColumnResize={handleColumnResize}
                  onSort={handleSort}
                />
              );
            })
          : // Non-virtualized columns (pinned)
            columns.map((column) => (
              <CustomTableHeaderCell
                key={column.key}
                column={column}
                isPinned={isPinned}
                sortState={sortState}
                onColumnPin={handleColumnPin}
                onColumnResize={handleColumnResize}
                onSort={handleSort}
              />
            ))}

        {/* Virtual padding right for scrollable columns */}
        {virtualPaddingRight > 0 && (
          <th {...stylex.props(styles.paddingCell(virtualPaddingRight))} />
        )}
      </tr>
    </thead>
  );
};

export default CustomTableHead;
