import * as stylex from '@stylexjs/stylex';
import { flexRender } from '@tanstack/react-table';

import { styles } from './TableHeadCell.stylex';
import type { TTableHeadCellProps } from './TableHeadCell.types';

const TableHeadCell = <TData extends Record<string, unknown>>({
  header,
}: TTableHeadCellProps<TData>) => {
  const width = header.getSize();
  return (
    <th
      colSpan={header.colSpan}
      {...stylex.props(
        styles.th(width)
        // isPinned ? styles.isPinned : styles.isNotPinned,
        // !left && styles.left(left),
        // !right && styles.right(right),
        // isFirstRightPinnedColumn && styles.isFirstRightPinnedColumn,
        // isLastLeftPinnedColumn && styles.isLastLeftPinnedColumn
      )}
    >
      {header.isPlaceholder ? null : (
        <button
          {...stylex.props(
            styles.buttonHeader
            // isFiltering && styles.isFiltering
          )}
          {...{
            onClick: header.column.getToggleSortingHandler(),
          }}
          aria-label={header.id}
          type='button'
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: <span {...stylex.props(styles.sortingSpan)}>&#8593;</span>,
            desc: <span {...stylex.props(styles.sortingSpan)}>&#8595;</span>,
          }[header.column.getIsSorted() as string] ?? null}

          {/* {tooltip && (
            <Tooltip content={<div>{tooltip}</div>}>
              <MdInfoOutline />
            </Tooltip>
          )}
          {isFiltering && <FaFilter />} */}
        </button>
      )}
      <span
        {...stylex.props(
          styles.resizer,
          header.column.getIsResizing() && styles.isResizing
        )}
        {...{
          onDoubleClick: () => header.column.resetSize(),
          onMouseDown: header.getResizeHandler(),
        }}
      />
    </th>
    // <th
    //   key={header.id}
    //   {...stylex.props(styles.th(header.getSize()))}
    // >
    //   <div
    //     {...{
    //       onClick: header.column.getToggleSortingHandler(),
    //     }}
    //     {...stylex.props(header.column.getCanSort() && styles.sortable)}
    //   >
    //     {flexRender(header.column.columnDef.header, header.getContext())}
    //     {{
    //       asc: ' 🔼',
    //       desc: ' 🔽',
    //     }[header.column.getIsSorted() as string] ?? null}
    //   </div>
    // </th>
  );
};

export default TableHeadCell;
