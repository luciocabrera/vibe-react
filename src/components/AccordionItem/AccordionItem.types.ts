import type { ComponentProps, ReactNode } from 'react';

export type TAccordionItemProps = ComponentProps<"details"> & {
  name: string;
  title: ReactNode;
};

