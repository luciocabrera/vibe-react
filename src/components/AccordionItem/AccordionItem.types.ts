import type { ComponentProps, ReactNode } from 'react';

export type TAccordionItemProps = ComponentProps<"details"> & {
  title: ReactNode;
};

