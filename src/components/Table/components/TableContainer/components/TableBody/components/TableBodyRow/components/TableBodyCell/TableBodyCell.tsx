import { flexRender } from '@tanstack/react-table';

import type { TTableBodyCellProps } from './TableBodyCell.types';

const TableBodyCell = <TData extends Record<string, unknown>>({
  cell,
}: TTableBodyCellProps<TData>) => {
  return (
    <td
      key={cell.id}
      style={{
        display: 'flex',
        width: cell.column.getSize(),
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
export default TableBodyCell;
