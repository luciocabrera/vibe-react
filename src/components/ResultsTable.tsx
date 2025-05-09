import React from 'react';
import type { ColumnDef } from '../App';

export type ResultsTableProps = {
  data: Record<string, any>[];
  columns: ColumnDef[];
  groupByUrl: boolean;
  groupByMethod: boolean;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({
  data,
  columns,
  groupByUrl,
  groupByMethod,
}) => {
  // Grouping logic
  let grouped: Record<string, Record<string, any>[]> = {};
  if (groupByUrl || groupByMethod) {
    data.forEach(row => {
      let groupKey = '';
      if (groupByUrl) groupKey += `URL: ${row.url} `;
      if (groupByMethod) groupKey += `Method: ${row.method}`;
      groupKey = groupKey.trim() || 'Ungrouped';
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(row);
    });
  } else {
    grouped[''] = data;
  }

  // Highlight best/worst for numeric columns (per group)
  function getHighlights(rows: Record<string, any>[]) {
    const highlights: Record<string, { best: number; worst: number }> = {};
    if (!Array.isArray(columns)) return highlights;
    columns
      .filter?.(col => col.type === 'number')
      .forEach(col => {
        const vals = rows
          .map(row => Number(row[col.key]))
          .filter(v => !isNaN(v));
        if (!vals.length) return;
        highlights[col.key] = {
          best: Math.min(...vals),
          worst: Math.max(...vals),
        };
      });
    return highlights;
  }

  return (
    <table
      style={{
        width: '100%',
        background: '#fff',
        borderCollapse: 'collapse',
        marginTop: 20,
      }}
    >
      <thead>
        <tr>
          {Array.isArray(columns)
            ? columns.map(col => <th key={col.key}>{col.label}</th>)
            : null}
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([group, rows]) => {
          const highlights = getHighlights(rows);
          return (
            <React.Fragment key={group}>
              {(groupByUrl || groupByMethod) && (
                <tr>
                  <td
                    colSpan={Array.isArray(columns) ? columns.length : 1}
                    style={{ background: '#ddeeff', fontWeight: 'bold' }}
                  >
                    {group}
                  </td>
                </tr>
              )}
              {rows.map((row, i) => (
                <tr key={i + (row.fileName || '')}>
                  {Array.isArray(columns)
                    ? columns.map(col => {
                        const val = row[col.key];
                        let className = '';
                        if (
                          col.type === 'number' &&
                          val !== '-' &&
                          !isNaN(Number(val))
                        ) {
                          if (Number(val) === highlights[col.key]?.best)
                            className = 'highlight-best';
                          if (Number(val) === highlights[col.key]?.worst)
                            className = 'highlight-worst';
                        }
                        return (
                          <td key={col.key} className={className}>
                            {val}
                          </td>
                        );
                      })
                    : null}
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

