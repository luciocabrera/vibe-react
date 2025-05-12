//@ts-nocheck
import type { FC } from 'react';
import { Fragment } from 'react';
import { styles } from './ResultsTable.stylex';
import * as stylex from '@stylexjs/stylex';

import type { ColumnDef } from '../App';

export type ResultsTableProps = {
  columns: ColumnDef[];
  data: Record<string, any>[];
  groupByMethod: boolean;
  groupByUrl: boolean;
};

export const ResultsTable: FC<ResultsTableProps> = ({
  columns,
  data,
  groupByMethod,
  groupByUrl,
}) => {
  // Grouping logic
  const grouped: Record<string, Record<string, any>[]> = {};
  if (groupByUrl || groupByMethod) {
    data.forEach((row) => {
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
  const getHighlights = (rows: Record<string, any>[]) => {
    const highlights: Record<string, { best: number; worst: number }> = {};
    if (!Array.isArray(columns)) return highlights;
    columns
      .filter?.((col) => col.type === 'number')
      .forEach((col) => {
        const vals = rows
          .map((row) => Number(row[col.key]))
          .filter((v) => !isNaN(v));
        if (!vals.length) return;
        highlights[col.key] = {
          best: Math.min(...vals),
          worst: Math.max(...vals),
        };
      });
    return highlights;
  };

  return (
    <table {...stylex.props(styles.table)}>
      <thead>
        <tr>
          {Array.isArray(columns)
            ? columns.map((col) => <th key={col.key}>{col.label}</th>)
            : null}
        </tr>
      </thead>
      <tbody>
        {Object.entries(grouped).map(([group, rows]) => {
          const highlights = getHighlights(rows);
          return (
            <Fragment key={group}>
              {(groupByUrl || groupByMethod) && (
                <tr>
                  <td
                    colSpan={Array.isArray(columns) ? columns.length : 1}
                    {...stylex.props(styles.groupRow)}
                  >
                    {group}
                  </td>
                </tr>
              )}
              {rows.map((row, i) => (
                <tr key={i + (row.fileName || '')}>
                  {Array.isArray(columns)
                    ? columns.map((col) => {
                        const val = row[col.key];
                        let highlightStyle = null;
                        if (
                          col.type === 'number' &&
                          val !== '-' &&
                          !isNaN(Number(val))
                        ) {
                          if (Number(val) === highlights[col.key]?.best)
                            highlightStyle = styles.highlightBest;
                          if (Number(val) === highlights[col.key]?.worst)
                            highlightStyle = styles.highlightWorst;
                        }
                        return (
                          <td
                            key={col.key}
                            {...stylex.props(highlightStyle)}
                          >
                            {val}
                          </td>
                        );
                      })
                    : null}
                </tr>
              ))}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
