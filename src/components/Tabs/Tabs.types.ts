import type { ComponentPropsWithRef } from 'react';

import type { TTabsItem } from '../TabsItem/TabsItem.types';

export type TTabsItems = TTabsItem[];

export type TTabsProps = ComponentPropsWithRef<'div'> & {
  defaultSelectedTab?: string;
  tabs?: TTabsItems;
};
