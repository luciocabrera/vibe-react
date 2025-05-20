import * as stylex from '@stylexjs/stylex';

import { TableBodyCell } from './components/TableBodyCell';
import { styles } from './TableBodyRow.stylex';
import type { TTableBodyRowProps } from './TableBodyRow.types';

const TableBodyRow = <TData extends Record<string, unknown>>({
  columnVirtualizer,
  row,
  rowVirtualizer,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualRow,
}: TTableBodyRowProps<TData>) => {
  const visibleCells = row.getVisibleCells();
  const virtualColumns = columnVirtualizer.getVirtualItems();
  return (
    <tr
      key={row.id}
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      data-index={virtualRow.index} //needed for dynamic row height measurement
      {...stylex.props(styles.row(virtualRow.start))}
    >
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <td {...stylex.props(styles.paddingCell(virtualPaddingLeft))} />
      ) : null}
      {virtualColumns.map((vc) => {
        const cell = visibleCells[vc.index];
        return (
          <TableBodyCell
            key={cell.id}
            cell={cell}
          />
        );
      })}
      {virtualPaddingRight ? (
        //fake empty column to the right for virtualization scroll padding
        <td {...stylex.props(styles.paddingCell(virtualPaddingRight))} />
      ) : null}
    </tr>
  );
};
export default TableBodyRow;
