import { useEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import { Badge } from '../Badge';

import { styles } from './Badges.stylex';
import type { TBadgesProps } from './Badges.types';

// Constants
const MAX_BADGES = 10;

const Badges = ({
  options,
  parentRef,
  selected = [],
  ...props
}: TBadgesProps) => {
  const containerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!parentRef || !parentRef.current) return;
    const updateWidth = () => {
      setMaxWidth(parentRef.current ? parentRef.current.offsetWidth : null);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [parentRef]);

  if (selected.length === 0) return null;

  let children = null;
  if (selected.length === options.length && options.length > 5) {
    children = <Badge value='All' />;
  } else if (selected.length <= MAX_BADGES) {
    children = selected.map((val) => (
      <Badge
        {...props}
        key={val}
        value={val}
      />
    ));
  } else {
    children = [
      ...selected.slice(0, MAX_BADGES).map((val) => (
        <Badge
          key={val}
          value={val}
          {...props}
        />
      )),
      <Badge
        key='more-badge'
        isMore
        value={`+${selected.length - MAX_BADGES} more`}
      />,
    ];
  }

  return (
    <span
      ref={containerRef}
      {...stylex.props(styles.badgesContainer)}
      style={maxWidth ? { maxWidth, width: '100%' } : {}}
    >
      {children}
    </span>
  );
};

export default Badges;
