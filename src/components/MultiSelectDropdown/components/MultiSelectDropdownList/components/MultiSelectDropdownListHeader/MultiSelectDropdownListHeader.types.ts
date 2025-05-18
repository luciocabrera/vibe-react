import type { ChangeEvent, ComponentProps } from 'react';

export type TMultiSelectDropdownListHeaderProps = ComponentProps<'div'> & {
  inputId?: string;
  onReset: () => void;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
};
