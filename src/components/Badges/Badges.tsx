import { Badge } from '../Badge';

import type { TBadgesProps } from './Badges.types';

// Constants
const MAX_BADGES = 10;

const Badges = ({ onRemove, options, selected }: TBadgesProps) => {
  if (selected.length === 0) return null;
  if (selected.length === options.length && options.length > 5) {
    return <Badge value='All' />;
  }
  if (selected.length <= MAX_BADGES) {
    return (
      <span className='selected-badges'>
        {selected.map(val => (
          <Badge key={val} value={val} onRemove={onRemove} />
        ))}
      </span>
    );
  }
  // Show MAX_BADGES badges and a "+x more" badge
  return (
    <span className='selected-badges'>
      {selected.slice(0, MAX_BADGES).map(val => (
        <Badge key={val} value={val} onRemove={onRemove} />
      ))}
      <Badge isMore value={`+${selected.length - MAX_BADGES} more`} />
    </span>
  );
};

export default Badges;

