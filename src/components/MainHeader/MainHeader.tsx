import * as stylex from '@stylexjs/stylex';

import { styles } from './MainHeader.stylex';
import type { TMainHeaderProps } from './MainHeader.types';

const MainHeader = ({
  actions,
  children,
  customTitle,
  icon,
  inverse = false,
  showTopRadius = false,
  title,
}: TMainHeaderProps) => (
  <div
    {...stylex.props(
      styles.container,
      showTopRadius && styles.radius,
      inverse && styles.inverse
    )}
  >
    <div {...stylex.props(styles.titleContainer)}>
      {customTitle ??
        (title && (
          <>
            {icon}
            {title}
          </>
        ))}
      {actions}
    </div>
    {children && (
      <section {...stylex.props(styles.toolbar)}>{children}</section>
    )}
  </div>
);

export default MainHeader;
