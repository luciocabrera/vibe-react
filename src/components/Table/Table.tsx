import { useCallback, useMemo, useState } from 'react';
import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableContainer } from './components/TableContainer';
import { makeColumns, makeData, type Person } from './makeData';

const Table = () => {
  const columns = useMemo<ColumnDef<Person>[]>(() => makeColumns(1_000), []);

  const [data, setData] = useState(() => makeData(1_000, columns));

  const handleRefreshData = useCallback(() => {
    setData(makeData(1_000, columns));
  }, [columns]);

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  //All important CSS styles are included as inline styles for this example. This is not recommended for your code.
  return (
    <div className='app'>
      {process.env.NODE_ENV === 'development' ? (
        <p>
          <strong>Notice:</strong> You are currently running React in
          development mode. Virtualized rendering performance will be slightly
          degraded until this application is built for production.
        </p>
      ) : null}
      <div>({columns.length.toLocaleString()} columns)</div>
      <div>({data.length.toLocaleString()} rows)</div>
      <button onClick={handleRefreshData}>Refresh Data</button>
      <TableContainer table={table} />
    </div>
  );
};

export default Table;
