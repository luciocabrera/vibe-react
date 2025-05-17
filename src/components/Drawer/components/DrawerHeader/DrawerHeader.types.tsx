import type { ComponentProps } from 'react';

export type TDrawerHeaderProps = ComponentProps<'header'> & {
  isPinned: boolean;
  onClose: () => void;
  onPinChange: () => void;
  title?: string;
};
