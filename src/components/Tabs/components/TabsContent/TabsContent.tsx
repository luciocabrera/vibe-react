import * as stylex from '@stylexjs/stylex';

import { styles } from './TabsContent.stylex';
import type { TTabsContentProps } from './TabsContent.types';

const TabsContent = ({ active, tabs }: TTabsContentProps) => (
  <div
    {...stylex.props(styles.tabsContent)}
    aria-labelledby={`tab-${active}`}
    id={`tabpanel-${active}`}
    role='tabpanel'
  >
    {tabs.map(({ children, key }) => (
      <div
        {...stylex.props(
          styles.tabPanel,
          active === key ? styles.active : styles.inactive
        )}
        key={key}
        aria-labelledby={`tab-${key}`}
        hidden={active !== key}
        id={`tabpanel-${key}`}
        role='tabpanel'
      >
        {children}
      </div>
    ))}
  </div>
);

export default TabsContent;
