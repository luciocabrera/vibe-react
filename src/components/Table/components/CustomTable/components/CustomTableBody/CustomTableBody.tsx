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

  // Show "No data" message when there's no data
  if (data.length === 0) {
    return (
      <tbody {...stylex.props(styles.body(40))}>
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
    <tbody {...stylex.props(styles.body(rowVirtualizer.getTotalSize()))}>
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
