import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import { TabsItem } from '../TabsItem';

import { styles } from './Tabs.stylex';
import type { TTabsProps } from './Tabs.types';

const Tabs = ({ defaultSelectedTab, ref, tabs, ...props }: TTabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs?.[0]?.key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = tabs?.findIndex(tab => tab.key === active) ?? 0;
  const activeChildren = tabs?.find(tab => tab.key === active)?.children;

  // Keyboard navigation handler
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!tabs || tabs.length === 0) return;
    let newIndex = activeIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (activeIndex + 1) % tabs.length;
      setActive(tabs[newIndex].key);
      tabRefs.current[newIndex]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      setActive(tabs[newIndex].key);
      tabRefs.current[newIndex]?.focus();
      e.preventDefault();
    } else if (e.key === 'Home') {
      setActive(tabs[0].key);
      tabRefs.current[0]?.focus();
      e.preventDefault();
    } else if (e.key === 'End') {
      setActive(tabs[tabs.length - 1].key);
      tabRefs.current[tabs.length - 1]?.focus();
      e.preventDefault();
    }
  };

  const handleTabClick = (key: string) => {
    setActive(key);}

  return (
    <div ref={ref} {...stylex.props(styles.tabs)} {...props}>
      <div
        {...stylex.props(styles.tabsButtonsWrapper)}
        aria-orientation="horizontal"
        role="tablist"
        onKeyDown={handleKeyDown}
      >
        {tabs?.map(({ header, key }) => (
          <TabsItem
            key={key}
            ref={el => {
              const tabIdx = tabs.findIndex(tab => tab.key === key);
              if (tabIdx !== -1) tabRefs.current[tabIdx] = el;
            }}
            active={active === key}
            aria-controls={`tabpanel-${key}`}
            aria-selected={active === key}
            id={`tab-${key}`}
            role="tab"
            tabIndex={active === key ? 0 : -1}
            onClick={() => handleTabClick(key)}
          >
            {header}
          </TabsItem>
        ))}
      </div>
      <div
        aria-labelledby={`tab-${active}`}
        id={`tabpanel-${active}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeChildren}
      </div>
    </div>
  );
};

export default Tabs;

