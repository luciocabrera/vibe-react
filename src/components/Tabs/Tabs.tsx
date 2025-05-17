import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { TabsContent } from './components/TabsContent';
import { TabsHeader } from './components/TabsHeader';
import { styles } from './Tabs.stylex';
import type { TTabsProps } from './Tabs.types';

const Tabs = ({ defaultSelectedTab, tabs, ...props }: TTabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs?.[0]?.key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = tabs?.findIndex((tab) => tab.key === active) ?? 0;

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
    setActive(key);
  };

  if (!tabs) return null;

  return (
    <div
      {...stylex.props(styles.tabs)}
      {...props}
    >
      <TabsHeader
        active={active}
        tabs={tabs}
        onKeyDown={handleKeyDown}
        onTabClick={handleTabClick}
      />
      <TabsContent
        active={active}
        tabs={tabs}
      />
    </div>
  );
};

export default Tabs;
