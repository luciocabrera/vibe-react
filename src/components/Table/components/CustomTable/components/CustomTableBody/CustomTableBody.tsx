import { useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';

import type { TCustomTableBodyProps } from '../../CustomTable.types';

import { CustomTableRow } from './components/CustomTableRow';
import { styles } from './CustomTableBody.stylex';

const CustomTableBody = ({
  columns,
  data,
  leftPinnedWidth,
  rightPinnedWidth,
  rowVirtualizer,
}: TCustomTableBodyProps) => {
  const virtualRows = rowVirtualizer.getVirtualItems();

  // Memoize the total size to prevent constant height changes
  const totalSize = useMemo(() => {
    const size = rowVirtualizer.getTotalSize();
    // Ensure minimum height and round to prevent fractional pixel changes
    return Math.max(Math.round(size), 400);
  }, [rowVirtualizer]);

  // Show "No data" message when there's no data
  if (data.length === 0) {
    return (
      <tbody {...stylex.props(styles.body(200))}>
        <tr>
          <td
            colSpan={columns.length}
            style={{
              color: '#6b7280',
              fontStyle: 'italic',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            No data available. Please upload JSON files to see results.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody {...stylex.props(styles.body(totalSize))}>
      {virtualRows.map((virtualRow) => {
        const rowData = data[virtualRow.index];

        return (
          <CustomTableRow
            key={virtualRow.index}
            columns={columns}
            leftPinnedWidth={leftPinnedWidth}
            rightPinnedWidth={rightPinnedWidth}
            rowData={rowData}
            rowIndex={virtualRow.index}
            rowVirtualizer={rowVirtualizer}
            virtualRow={virtualRow}
          />
        );
      })}
    </tbody>
  );
};

export default CustomTableBody;
