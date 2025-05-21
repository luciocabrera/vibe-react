import type { ReactNode } from 'react';
import type { Cell } from '@tanstack/react-table';

import { DateDisplay } from '@/components/display/DateDisplay';
import type { DateParameterType } from '@/components/display/DateDisplay/DateDisplay.types';
import { NumericDisplay } from '@/components/display/NumericDisplay';
import { SpanDisplay } from '@/components/display/SpanDisplay';

import { TableCheckbox } from '../components/TableCheckbox';

type TRenderCellArgs<TData> = {
  cell: Cell<TData, unknown>;
};

export const renderCell = <TData extends Record<string, unknown>>({
  cell,
}: TRenderCellArgs<TData>) => {
  const cellType = cell.column.columnDef.meta?.type ?? 'string';

  switch (cellType) {
    case 'boolean':
      return <TableCheckbox info={cell.getContext()} />;
    case 'currency':
      return (
        <NumericDisplay
          output={'currency'}
          value={cell.getValue() as number}
        />
      );
    case 'date':
      return <DateDisplay value={cell.getValue() as DateParameterType} />;
    case 'number':
      return <NumericDisplay value={cell.getValue() as number} />;
    default:
      return <SpanDisplay value={cell.getValue() as ReactNode} />;
  }
};
