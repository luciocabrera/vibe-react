import { faker } from '@faker-js/faker';
import type { ColumnDef } from '@tanstack/react-table';

export type CustomColumnDef = {
  filterable?: boolean;
  key: string;
  label: string;
  rangeFilter?: boolean;
  sortable?: boolean;
  type: 'number' | 'string';
};

export const makeColumns = (num: number) =>
  [...Array(num)].map((_, i) => {
    return {
      accessorKey: i.toString(),
      header: 'Column ' + i.toString(),
      size: Math.floor(Math.random() * 150) + 100,
    };
  });

export const makeCustomColumns = (num: number) =>
  [...Array(num)].map((_, i) => {
    return {
      key: i.toString(),
      label: 'Column ' + i.toString(),
      // size: Math.floor(Math.random() * 150) + 100,
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

export const makeCustomData = (num: number, columns: CustomColumnDef[]) => {
  const data = [...Array(num)].map((_) => {
    const row: Record<string, unknown> = {};

    columns.forEach((col) => {
      const key = col.key;
      let value: number | string;

      switch (key) {
        case 'firstName':
          value = faker.person.firstName();
          break;
        case 'lastName':
          value = faker.person.lastName();
          break;
        case 'age':
          value = faker.number.int({ max: 80, min: 18 });
          break;
        case 'email':
          value = faker.internet.email();
          break;
        default:
          if (col.type === 'number') {
            value = faker.number.int({ max: 1000, min: 1 });
          } else {
            value = faker.person.firstName();
          }
      }

      row[key] = value;
    });

    return row;
  });

  // Let's log just the first row to see if the structure is correct
  if (data.length > 0) {
    console.log('First generated row:', data[0]);
    console.log(
      'Expected columns:',
      columns.map((col) => col.key)
    );
  }

  return data;
};

export type Person = ReturnType<typeof makeData>[0];
