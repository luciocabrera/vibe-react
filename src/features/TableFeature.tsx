import { useCallback, useEffect, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import type { ColumnDef } from '@/App';
import { Table } from '@/components/Table';

import { makeCustomData } from './makeData';
import { styles } from './Table.stylex';

const TableFeature = () => {
  // Clear localStorage for this table on mount to reset any stored column widths
  useEffect(() => {
    const tableStorageKey = 'vibe-table-settings-table-feature';
    const stored = localStorage.getItem(tableStorageKey);
    if (stored) {
      console.log('Clearing stored table settings for table-feature:', stored);
      localStorage.removeItem(tableStorageKey);
    }
  }, []);

  const columns = useMemo<ColumnDef[]>(
    () => [
      {
        filterable: true,
        key: 'firstName',
        label: 'First Name',
        sortable: true,
        type: 'string',
      },
      {
        filterable: true,
        key: 'lastName',
        label: 'Last Name',
        sortable: true,
        type: 'string',
      },
      {
        key: 'age',
        label: 'Age',
        rangeFilter: true,
        sortable: true,
        type: 'number',
      },
      {
        filterable: true,
        key: 'email',
        label: 'Email',
        sortable: true,
        type: 'string',
      },
    ],
    []
  );

  const [data, setData] = useState(() => makeCustomData(100, columns));

  const handleRefreshData = useCallback(
    () => setData(makeCustomData(100, columns)),
    [columns]
  );

  //All important CSS styles are included as stylex styles
  return (
    <div {...stylex.props(styles.app)}>
      {process.env.NODE_ENV === 'development' ? (
        <p {...stylex.props(styles.notice)}>
          <strong>Notice:</strong> You are currently running React in
          development mode. Virtualized rendering performance will be slightly
          degraded until this application is built for production.
        </p>
      ) : null}
      <div {...stylex.props(styles.infoText)}>
        ({columns.length.toLocaleString()} columns)
      </div>
      <div {...stylex.props(styles.infoText)}>
        ({data.length.toLocaleString()} rows)
      </div>
      <button
        {...stylex.props(styles.button)}
        onClick={handleRefreshData}
      >
        Refresh Data
      </button>
      <Table
        key='table-feature-reset'
        columns={columns}
        data={data}
        tableId='table-feature'
      />
    </div>
  );
};

export default TableFeature;
