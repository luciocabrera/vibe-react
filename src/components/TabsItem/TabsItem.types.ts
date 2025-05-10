import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TTabsItem = {
  children: JSX.Element;
  header: ReactNode;
  key: string;
};

export type TTabItemProps = ComponentPropsWithRef<'button'> & {
  active?: boolean;
};
