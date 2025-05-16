import type { ComponentPropsWithRef } from 'react';

import type { TTabsItem } from '../TabButton';

export type TTabsItems = TTabsItem[];

export type TTabsHeaderProps = ComponentPropsWithRef<'div'> & {
  active?: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onTabClick: (key: string) => void;
  tabs: TTabsItems;
};
