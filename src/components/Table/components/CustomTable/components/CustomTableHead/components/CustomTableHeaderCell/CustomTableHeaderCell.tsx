import { useCallback, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import type { TCustomTableHeaderCellProps } from '../../../../CustomTable.types';

import { styles } from './CustomTableHeaderCell.stylex';

const CustomTableHeaderCell = ({
  column,
  leftPinnedWidth: _leftPinnedWidth,
  onColumnPin,
  onColumnResize,
  onSort,
  position,
  rightPinnedWidth: _rightPinnedWidth,
  sortState,
}: TCustomTableHeaderCellProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const startWidth = useRef<number>(0);
  const startX = useRef<number>(0);

  // Get current sort state for this column
  const currentSort = sortState.find(
    (s: { dir: string; key: string }) => s.key === column.key
  );
  const sortIcon = currentSort ? (currentSort.dir === 'asc' ? ' ↑' : ' ↓') : '';

  // Handle column sort
  const handleSort = useCallback(() => {
    if (column.sortable) {
      onSort(column.key);
    }
  }, [column.key, column.sortable, onSort]);

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      startWidth.current = column.width;
      startX.current = e.clientX;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX.current;
        const newWidth = Math.max(50, startWidth.current + deltaX);
        onColumnResize(column.key, newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [column.key, column.width, onColumnResize]
  );

  // Handle pin/unpin
  const handlePin = useCallback(
    (position: 'left' | 'none' | 'right') => {
      onColumnPin?.(column.key, position);
    },
    [column.key, onColumnPin]
  );

  // Determine pinning styles
  const pinnedStyles = column.isLeftPinned
    ? styles.leftPinned(position || 0)
    : column.isRightPinned
      ? styles.rightPinned(position || 0)
      : null;

  const isPinned = column.isLeftPinned || column.isRightPinned;

  return (
    <th
      {...stylex.props(
        styles.headerCell(column.width),
        isResizing && styles.resizing,
        currentSort && styles.sorted,
        pinnedStyles
      )}
    >
      <div {...stylex.props(styles.headerContent)}>
        {/* Column label and sort indicator */}
        <div
          {...stylex.props(
            styles.labelContainer,
            column.sortable && styles.sortable
          )}
          onClick={handleSort}
        >
          <span {...stylex.props(styles.label)}>
            {column.label}
            {sortIcon}
          </span>
        </div>

        {/* Pin controls */}
        {onColumnPin && (
          <div {...stylex.props(styles.pinControls)}>
            {!isPinned && (
              <>
                <button
                  {...stylex.props(styles.pinButton)}
                  title='Pin to left'
                  onClick={() => handlePin('left')}
                >
                  ⇤
                </button>
                <button
                  {...stylex.props(styles.pinButton)}
                  title='Pin to right'
                  onClick={() => handlePin('right')}
                >
                  ⇥
                </button>
              </>
            )}
            {isPinned && (
              <button
                {...stylex.props(styles.pinButton)}
                title='Unpin'
                onClick={() => handlePin('none')}
              >
                ⊗
              </button>
            )}
          </div>
        )}

        {/* Resize handle */}
        <div
          {...stylex.props(styles.resizeHandle)}
          onMouseDown={handleResizeStart}
        />
      </div>
    </th>
  );
};

export default CustomTableHeaderCell;
