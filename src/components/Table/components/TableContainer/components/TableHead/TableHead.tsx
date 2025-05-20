import * as stylex from '@stylexjs/stylex';

import { TableHeadRow } from './components/TableHeadRow';
import { styles } from './TableHead.stylex';
import type { TTableHeadProps } from './TableHead.types';

const TableHead = <TData extends Record<string, unknown>>({
  columnVirtualizer,
  table,
  virtualPaddingLeft,
  virtualPaddingRight,
}: TTableHeadProps<TData>) => {
  return (
    <thead {...stylex.props(styles.head)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableHeadRow
          key={headerGroup.id}
          columnVirtualizer={columnVirtualizer}
          headerGroup={headerGroup}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </thead>
  );
};

export default TableHead;
