import type { ComponentPropsWithRef } from 'react';

import type { TTabsItem } from '../TabButton';

export type TTabsItems = TTabsItem[];

export type TTabsContentProps = ComponentPropsWithRef<'div'> & {
  active?: string;
  tabs: TTabsItems;
};
