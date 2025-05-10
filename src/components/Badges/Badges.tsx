import { Badge } from '../Badge';

import type { TBadgesProps } from './Badges.types';

// Constants
const MAX_BADGES = 10;

const Badges = ({ options, selected = [], ...props }: TBadgesProps) => {
  if (selected.length === 0) return null;
  if (selected.length === options.length && options.length > 5) {
    return <Badge value='All' />;
  }
  if (selected.length <= MAX_BADGES) {
    return (
      <span className='selected-badges'>
        {selected.map(val => (
          <Badge {...props} key={val} value={val} />
        ))}
      </span>
    );
  }
  // Show MAX_BADGES badges and a "+x more" badge
  return (
    <span className='selected-badges'>
      {selected.slice(0, MAX_BADGES).map(val => (
        <Badge key={val} value={val} {...props} />
      ))}
      <Badge isMore value={`+${selected.length - MAX_BADGES} more`} />
    </span>
  );
};

export default Badges;

