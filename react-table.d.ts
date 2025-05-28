import "@tanstack/react-table";

export type TColumnMetaDataType =
  | "boolean"
  | "currency"
  | "date"
  | "number"
  | "string"
  | "text";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: TColumnMetaDataType;
    shouldUseDefaultCell?: boolean;
    display?: boolean;
    helpText?: string;
  }
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
