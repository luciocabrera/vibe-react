import * as stylex from '@stylexjs/stylex';

import type { TCustomTableCellProps } from '../../../../../../CustomTable.types';

import { styles } from './CustomTableCell.stylex';

const CustomTableCell = ({
  column,
  leftPinnedWidth: _leftPinnedWidth,
  position,
  rightPinnedWidth: _rightPinnedWidth,
  rowData: _rowData,
  value,
}: TCustomTableCellProps) => {
  // Format cell value based on column type
  const formatValue = (val: unknown) => {
    if (val === null || val === undefined) return '';

    switch (column.type) {
      case 'number':
        return typeof val === 'number' ? val.toLocaleString() : String(val);
      case 'string':
      default:
        return String(val);
    }
  };

  const displayValue = formatValue(value);

  // Determine pinning styles
  const pinnedStyles = column.isLeftPinned
    ? styles.leftPinned(position || 0)
    : column.isRightPinned
      ? styles.rightPinned(position || 0)
      : null;

  return (
    <td
      {...stylex.props(
        styles.cell(column.width),
        column.type === 'number' && styles.numberCell,
        pinnedStyles
      )}
    >
      <div {...stylex.props(styles.cellContent)}>
        <span
          {...stylex.props(styles.cellText)}
          title={displayValue}
        >
          {displayValue}
        </span>
      </div>
    </td>
  );
};

export default CustomTableCell;
