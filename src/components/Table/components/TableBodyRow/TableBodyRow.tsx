import { TableBodyCell } from '../TableBodyCell';

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
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: '100%',
      }}
    >
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <td style={{ display: 'flex', width: virtualPaddingLeft }} />
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
        <td style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </tr>
  );
};
export default TableBodyRow;
