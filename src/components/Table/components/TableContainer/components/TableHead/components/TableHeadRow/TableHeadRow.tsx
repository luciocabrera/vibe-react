import * as stylex from '@stylexjs/stylex';

import { TableHeadCell } from './components/TableHeadCell';
import { styles } from './TableHeadRow.stylex';
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
      {...stylex.props(styles.row)}
    >
      {virtualPaddingLeft ? (
        //fake empty column to the left for virtualization scroll padding
        <th {...stylex.props(styles.paddingCell(virtualPaddingLeft))} />
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
        <th {...stylex.props(styles.paddingCell(virtualPaddingRight))} />
      ) : null}
    </tr>
  );
};

export default TableHeadRow;
