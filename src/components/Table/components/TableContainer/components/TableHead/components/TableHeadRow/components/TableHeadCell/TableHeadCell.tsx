import { flexRender } from '@tanstack/react-table';

import type { TTableHeadCellProps } from './TableHeadCell.types';

const TableHeadCell = <TData extends Record<string, unknown>>({
  header,
}: TTableHeadCellProps<TData>) => {
  return (
    <th
      key={header.id}
      style={{
        display: 'flex',
        width: header.getSize(),
      }}
    >
      <div
        {...{
          className: header.column.getCanSort()
            ? 'cursor-pointer select-none'
            : '',
          onClick: header.column.getToggleSortingHandler(),
        }}
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
