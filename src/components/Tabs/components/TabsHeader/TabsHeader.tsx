import { useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { TabButton } from '../TabButton';

import { styles } from './TabsHeader.stylex';
import type { TTabsHeaderProps } from './TabsHeader.types';

const TabsHeader = ({
  active,
  onKeyDown: handleKeyDown,
  onTabClick: handleTabClick,
  tabs,
}: TTabsHeaderProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div
      {...stylex.props(styles.tabsButtonsWrapper)}
      aria-orientation='horizontal'
      role='tablist'
      tabIndex={0} 
      onKeyDown={handleKeyDown}
    >
      {tabs.map(({ header, key }) => (
        <TabButton
          key={key}
          ref={(el) => {
            const tabIdx = tabs.findIndex((tab) => tab.key === key);
            if (tabIdx !== -1) tabRefs.current[tabIdx] = el;
          }}
          active={active === key}
          aria-controls={`tabpanel-${key}`}
          aria-selected={active === key}
          id={`tab-${key}`}
          role='tab'
          tabIndex={active === key ? 0 : -1}
          onClick={() => handleTabClick(key)}
        >
          {header}
        </TabButton>
      ))}
    </div>
  );
};

export default TabsHeader;
