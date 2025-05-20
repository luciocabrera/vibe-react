import { TableHeadCell } from './components/TableHeadCell';
import type { TTableHeadRowProps } from './TableHeadRow.types';

const TableHeadRow = <TData extends Record<string, unknown>>({
  columnVirtualizer,
  headerGroup,
  virtualPaddingLeft,
  virtualPaddingRight,
}: TTableHeadRowProps<TData>) => {
  const virtualColumns = columnVirtualizer.getVirtualItems();
  return (
    <tr
      key={headerGroup.id}
      style={{ display: 'flex', width: '100%' }}
    >
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {virtualColumns.map((virtualColumn) => {
        const header = headerGroup.headers[virtualColumn.index];
        return (
          <TableHeadCell
            key={header.id}
            header={header}
          />
        );
      })}
      {virtualPaddingRight ? (
        //fake empty column to the right for virtualization scroll padding
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </tr>
  );
};

export default TableHeadRow;
