import { faker } from '@faker-js/faker';
import type { ColumnDef } from '@tanstack/react-table';

export const makeColumns = (num: number) =>
  [...Array(num)].map((_, i) => {
    return {
      accessorKey: i.toString(),
      header: 'Column ' + i.toString(),
      size: Math.floor(Math.random() * 150) + 100,
    };
  });

export const makeData = (
  num: number,
  columns: ColumnDef<{ [k: string]: unknown }>[]
) =>
  [...Array(num)].map(() => ({
    ...Object.fromEntries(
      columns.map((col) => [
        (col as { accessorKey: string }).accessorKey,
        faker.person.firstName(),
      ])
    ),
  }));

export type Person = ReturnType<typeof makeData>[0];
