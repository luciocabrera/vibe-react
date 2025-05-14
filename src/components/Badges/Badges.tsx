import { useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { renderBadges } from './utils/renderBadges';
import { styles } from './Badges.stylex';
import type { TBadgesProps } from './Badges.types';

const Badges = (props: TBadgesProps) => {
  const { selected = [] } = props;
  const containerRef = useRef<HTMLSpanElement | null>(null);

  if (selected.length === 0) return null;

  return (
    <span
      ref={containerRef}
      data-testid='badges-container'
      {...stylex.props(styles.badgesContainer)}
    >
      {renderBadges(props)}
    </span>
  );
};

export default Badges;
