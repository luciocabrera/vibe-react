import * as stylex from '@stylexjs/stylex';
import { flexRender } from '@tanstack/react-table';

import { styles } from './TableBodyCell.stylex';
import type { TTableBodyCellProps } from './TableBodyCell.types';

const TableBodyCell = <TData extends Record<string, unknown>>({
  cell,
}: TTableBodyCellProps<TData>) => {
  return (
    <td
      key={cell.id}
      {...stylex.props(styles.td(cell.column.getSize()))}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
export default TableBodyCell;
