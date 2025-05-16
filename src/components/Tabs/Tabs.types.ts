import type { ComponentPropsWithRef } from 'react';

import type { TTabsItem } from './components/TabButton/TabButton.types';

export type TTabsItems = TTabsItem[];

export type TTabsProps = ComponentPropsWithRef<'div'> & {
  defaultSelectedTab?: string;
  tabs?: TTabsItems;
};
