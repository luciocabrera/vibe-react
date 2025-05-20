import * as stylex from '@stylexjs/stylex';
import { flexRender } from '@tanstack/react-table';

import { styles } from './TableHeadCell.stylex';
import type { TTableHeadCellProps } from './TableHeadCell.types';

const TableHeadCell = <TData extends Record<string, unknown>>({
  header,
}: TTableHeadCellProps<TData>) => {
  return (
    <th
      key={header.id}
      {...stylex.props(styles.th(header.getSize()))}
    >
      <div
        {...{
          onClick: header.column.getToggleSortingHandler(),
        }}
        {...stylex.props(header.column.getCanSort() && styles.sortable)}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: ' 🔼',
          desc: ' 🔽',
        }[header.column.getIsSorted() as string] ?? null}
      </div>
    </th>
  );
};

export default TableHeadCell;
