import type { ComponentPropsWithRef } from 'react';
import type { CellContext } from '@tanstack/react-table';

export type TCheckboxProps<TData, TValue> = ComponentPropsWithRef<'input'> & {
  info: CellContext<TData, TValue>;
};
