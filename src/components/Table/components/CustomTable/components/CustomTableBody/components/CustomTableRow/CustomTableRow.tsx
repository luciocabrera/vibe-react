import * as stylex from '@stylexjs/stylex';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import type { TProcessedColumn } from '../../../CustomTable.types';

import { CustomTableCell } from './components/CustomTableCell';
import { styles } from './CustomTableRow.stylex';

type TCustomTableRowProps = {
  columns: TProcessedColumn[];
  isPinned?: 'left' | 'right';
  rowData: Record<string, any>;
  rowIndex: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow: VirtualItem;
};

const CustomTableRow = ({
  columns,
  isPinned,
  rowData,
  rowIndex,
  rowVirtualizer,
  virtualColumns,
  virtualPaddingLeft = 0,
  virtualPaddingRight = 0,
  virtualRow,
}: TCustomTableRowProps) => {
  return (
    <tr
      ref={(node) => rowVirtualizer.measureElement(node)}
      data-index={virtualRow.index}
      {...stylex.props(
        styles.row(virtualRow.start),
        rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
      )}
    >
      {/* Virtual padding left for scrollable columns */}
      {virtualPaddingLeft > 0 && (
        <td {...stylex.props(styles.paddingCell(virtualPaddingLeft))} />
      )}

      {/* Render visible columns */}
      {virtualColumns
        ? // Virtualized columns
          virtualColumns.map((virtualColumn) => {
            const column = columns[virtualColumn.index];
            if (!column) return null;

            return (
              <CustomTableCell
                key={column.key}
                column={column}
                rowData={rowData}
                value={rowData[column.key]}
              />
            );
          })
        : // Non-virtualized columns (pinned)
          columns.map((column) => (
            <CustomTableCell
              key={column.key}
              column={column}
              rowData={rowData}
              value={rowData[column.key]}
            />
          ))}

      {/* Virtual padding right for scrollable columns */}
      {virtualPaddingRight > 0 && (
        <td {...stylex.props(styles.paddingCell(virtualPaddingRight))} />
      )}
    </tr>
  );
};

export default CustomTableRow;
