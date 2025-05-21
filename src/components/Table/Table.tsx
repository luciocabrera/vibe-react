import { useCallback, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableContainer } from './components/TableContainer';
import { makeColumns, makeData, type Person } from './makeData';
import { styles } from './Table.stylex';

const Table = () => {
  const columns = useMemo<ColumnDef<Person>[]>(() => makeColumns(1_000), []);

  const [data, setData] = useState(() => makeData(1_000, columns));

  const handleRefreshData = useCallback(() => {
    setData(makeData(1_000, columns));
  }, [columns]);

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    data,
    // debugTable: true,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
      <TableContainer table={table} />
    </div>
  );
};

export default Table;
