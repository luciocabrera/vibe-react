import { useState } from 'react';

import { Table } from './components/Table';
import TableFeature from './features/TableFeature';

// Dummy data loader (replace with real file input logic as needed)
const initialData: Record<string, any>[] = [
  {
    fileName: 'sample-test-1.json',
    url: 'https://api.example.com/users',
    method: 'GET',
    num_requests: 100,
    concurrency: 10,
    avgTime: 250.5,
    minTime: 120.2,
    maxTime: 450.8,
    avgSize: 1024,
  },
  {
    fileName: 'sample-test-2.json',
    url: 'https://api.example.com/posts',
    method: 'POST',
    num_requests: 50,
    concurrency: 5,
    avgTime: 180.3,
    minTime: 95.1,
    maxTime: 320.7,
    avgSize: 512,
  },
  {
    fileName: 'sample-test-3.json',
    url: 'https://api.example.com/comments',
    method: 'GET',
    num_requests: 200,
    concurrency: 20,
    avgTime: 75.8,
    minTime: 45.2,
    maxTime: 150.6,
    avgSize: 256,
  },
];

// Define a dynamic schema for columns
// TODO: Use the one from tanstack table or a global type, it should moved to a shared file
export type ColumnDef = {
  filterable?: boolean;
  key: string;
  label: string;
  rangeFilter?: boolean;
  sortable?: boolean;
  type: 'number' | 'string';
};

const columns: ColumnDef[] = [
  {
    filterable: true,
    key: 'fileName',
    label: 'File Name',
    sortable: true,
    type: 'string',
  },
  {
    filterable: true,
    key: 'url',
    label: 'URL',
    sortable: true,
    type: 'string',
  },
  {
    filterable: true,
    key: 'method',
    label: 'Method',
    sortable: true,
    type: 'string',
  },
  {
    filterable: false,
    key: 'num_requests',
    label: 'num_requests',
    sortable: true,
    type: 'number',
  },
  {
    filterable: false,
    key: 'concurrency',
    label: 'concurrency',
    sortable: true,
    type: 'number',
  },
  {
    filterable: false,
    key: 'avgTime',
    label: 'Avg Time (ms)',
    rangeFilter: true,
    sortable: true,
    type: 'number',
  },
  {
    filterable: false,
    key: 'minTime',
    label: 'Min Time (ms)',
    rangeFilter: true,
    sortable: true,
    type: 'number',
  },
  {
    filterable: false,
    key: 'maxTime',
    label: 'Max Time (ms)',
    rangeFilter: true,
    sortable: true,
    type: 'number',
  },
  {
    filterable: false,
    key: 'avgSize',
    label: 'Avg Size (bytes)',
    rangeFilter: true,
    sortable: true,
    type: 'number',
  },
];

const App: React.FC = () => {
  // State for all data (replace with file upload logic)
  const [data, setData] = useState<Record<string, any>[]>(initialData);

  // File upload handler (for demo, not production)
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const promises = Array.from(files).map((file) =>
      file.text().then((text) => {
        try {
          const data = JSON.parse(text);
          let metadata, results;
          if (Array.isArray(data)) {
            results = data;
            metadata = {};
          } else {
            metadata = data.metadata ?? {};
            results = data.results ?? [];
          }
          const successes = results.filter(
            (r: Record<string, any>) =>
              r.status === 200 && typeof r.time_ms === 'number'
          );
          const sizes = successes
            .map((r: Record<string, any>) => r.size_bytes)
            .filter((x: any) => typeof x === 'number');
          const times = successes
            .map((r: Record<string, any>) => r.time_ms)
            .filter((x: any) => typeof x === 'number');
          const avgTime = times.length
            ? times.reduce((a: number, b: number) => a + b, 0) / times.length
            : '-';
          const minTime = times.length ? Math.min(...times) : '-';
          const maxTime = times.length ? Math.max(...times) : '-';
          const avgSize = sizes.length
            ? sizes.reduce((a: number, b: number) => a + b, 0) / sizes.length
            : '-';
          return {
            avgSize,
            avgTime,
            concurrency: metadata.concurrency ?? '-',
            fileName: file.name,
            maxTime,
            method: metadata.method ?? '-',
            minTime,
            num_requests: metadata.num_requests ?? '-',
            url: metadata.url ?? '-',
          } as Record<string, any>;
        } catch {
          return null;
        }
      })
    );
    Promise.all(promises).then((rows) => {
      setData(rows.filter(Boolean) as Record<string, any>[]);
    });
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: 1200, padding: 24 }}>
      <h1>API Benchmark Multi-Results Viewer (React)</h1>
      <div style={{ marginBottom: 18 }}>
        <label>
          <b>Select multiple results JSON files:</b>
          <input
            multiple
            accept='application/json'
            style={{ marginLeft: 12 }}
            type='file'
            onChange={handleFileInput}
          />
        </label>
      </div>

      <Table
        columns={columns}
        data={data}
        tableId='main-table'
      />
      <TableFeature />
    </div>
  );
};

export default App;
