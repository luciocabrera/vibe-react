import type { FC } from 'react';
import { useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';

import type { ColumnDef } from '../App';
import { convertToTanStackColumns } from '../utils/columnAdapter';

import { Table } from './Table';

// Styles for the TableWrapper component
const styles = stylex.create({
  groupRow: {
    backgroundColor: '#ddeeff !important',
    fontWeight: 'bold',
  },
  wrapper: {
    overflow: 'hidden',
    width: '100%',
  },
});

type TableWrapperProps = {
  columns: ColumnDef[];
  data: Record<string, unknown>[];
  groupByMethod?: boolean;
  groupByUrl?: boolean;
};

export const TableWrapper: FC<TableWrapperProps> = ({
  columns,
  data,
  groupByMethod = false,
  groupByUrl = false,
}) => {
  // Process data for grouping
  const { processedColumns, processedData } = useMemo(() => {
    // Create columns including group column if needed
    let finalColumns = [...columns];
    if (groupByUrl || groupByMethod) {
      // If we're grouping, we'll need to add a column to display the group
      const groupColumn: ColumnDef = {
        key: '_group',
        label: 'Group',
        sortable: true,
        type: 'string',
      };

      // Add the group column at the beginning
      finalColumns = [groupColumn, ...finalColumns];
    }

    // Process data for groups
    if (groupByUrl || groupByMethod) {
      // Initialize grouped data by creating a map
      const groupedMap = new Map<string, Record<string, unknown>[]>();

      data.forEach((row) => {
        let groupKey = '';
        if (groupByUrl) groupKey += `URL: ${row.url as string} `;
        if (groupByMethod) groupKey += `Method: ${row.method as string}`;
        groupKey = groupKey.trim() || 'Ungrouped';

        // Create an array for this group if it doesn't exist
        if (!groupedMap.has(groupKey)) {
          groupedMap.set(groupKey, []);
        }
        // Add the row to its group with the group identifier
        groupedMap.get(groupKey)?.push({ ...row, _group: groupKey });
      });

      // Flatten the grouped data
      const result: Record<string, unknown>[] = [];
      groupedMap.forEach((rows) => {
        if (rows.length > 0) {
          result.push(...rows);
        }
      });

      return {
        processedColumns: finalColumns,
        processedData: result,
      };
    }

    return {
      processedColumns: finalColumns,
      processedData: data,
    };
  }, [data, columns, groupByMethod, groupByUrl]);

  // Convert columns to TanStack format
  const tanStackColumns = useMemo(() => {
    return convertToTanStackColumns(processedColumns);
  }, [processedColumns]);

  return (
    <div {...stylex.props(styles.wrapper)}>
      <Table
        columns={tanStackColumns}
        data={processedData}
      />
    </div>
  );
};
