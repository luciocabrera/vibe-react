import type { ComponentProps } from 'react';

export type TMultiSelectDropdownListFooterProps = ComponentProps<'div'> & {
  onClose: () => void;
};
