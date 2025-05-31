//@ts-nocheck
import { useCallback, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { ColumnDef } from '@tanstack/react-table';

import { Table } from '@/components/Table';

import {
  makeColumns,
  makeCustomColumns,
  makeCustomData,
  type Person,
} from './makeData';
import { styles } from './Table.stylex';

const TableFeature = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => makeCustomColumns(1_000),
    []
  );

  const [data, setData] = useState(() => makeCustomData(1_000, columns));

  const handleRefreshData = useCallback(
    () => setData(makeData(1000, columns)),
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
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default TableFeature;
