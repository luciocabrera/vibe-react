import * as stylex from '@stylexjs/stylex';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TableBodyRow } from './components/TableBodyRow';
import { styles } from './TableBody.stylex';
import type { TTableBodyProps } from './TableBody.types';

const TableBody = <TData extends Record<string, unknown>>({
  columnVirtualizer,
  table,
  tableContainerRef,
  virtualPaddingLeft,
  virtualPaddingRight,
}: TTableBodyProps<TData>) => {
  const { rows } = table.getRowModel();

  //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <tbody {...stylex.props(styles.body(rowVirtualizer.getTotalSize()))}>
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];

        return (
          <TableBodyRow
            key={row.id}
            columnVirtualizer={columnVirtualizer}
            row={row}
            rowVirtualizer={rowVirtualizer}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
            virtualRow={virtualRow}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
