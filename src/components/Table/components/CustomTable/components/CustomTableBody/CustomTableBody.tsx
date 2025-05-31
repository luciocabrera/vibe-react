import * as stylex from '@stylexjs/stylex';

import type { TCustomTableBodyProps } from '../../CustomTable.types';

import { CustomTableRow } from './components/CustomTableRow';
import { styles } from './CustomTableBody.stylex';

const CustomTableBody = ({
  columns,
  data,
  isPinned,
  rowVirtualizer,
  virtualColumns,
  virtualPaddingLeft = 0,
  virtualPaddingRight = 0,
}: TCustomTableBodyProps) => {
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <tbody {...stylex.props(styles.body(rowVirtualizer.getTotalSize()))}>
      {virtualRows.map((virtualRow) => {
        const rowData = data[virtualRow.index];
        if (!rowData) return null;

        return (
          <CustomTableRow
            key={virtualRow.index}
            columns={columns}
            isPinned={isPinned}
            rowData={rowData}
            rowIndex={virtualRow.index}
            rowVirtualizer={rowVirtualizer}
            virtualColumns={virtualColumns}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
            virtualRow={virtualRow}
          />
        );
      })}
    </tbody>
  );
};

export default CustomTableBody;
