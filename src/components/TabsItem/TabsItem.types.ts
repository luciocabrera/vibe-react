import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TTabsItem = {
  children: ReactNode;
  header: ReactNode;
  key: string;
};

export type TTabItemProps = ComponentPropsWithRef<'button'> & {
  active?: boolean;
};

