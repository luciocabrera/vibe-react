import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import { TabsItem } from '../TabsItem';

import { styles } from './Tabs.stylex';
import type { TTabsProps } from './Tabs.types';

const Tabs = ({ defaultSelectedTab, ref, tabs, ...props }: TTabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs?.[0].key);
  const activeChildren = tabs?.find(tab => tab.key === active)?.children;
  const handleTabOnClick = (key: string) => setActive(key);
  return (
    <div ref={ref} {...stylex.props(styles.tabs)} {...props}>
      <div {...stylex.props(styles.tabsButtonsWrapper)}>
        {tabs?.map(({ header, key }) => (
          <TabsItem
            key={key}
            active={active === key}
            id={key}
            onClick={() => handleTabOnClick(key)}
          >
            {header}
          </TabsItem>
        ))}
      </div>
      {activeChildren}
    </div>
  );
};

export default Tabs;

