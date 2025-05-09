import React from 'react';
import Badge from './Badge';

// Constants
const MAX_BADGES = 10;

export type BadgesProps = {
  selected: string[];
  options: string[];
  onRemove?: (val: string) => void;
};

export const Badges: React.FC<BadgesProps> = ({
  selected,
  options,
  onRemove,
}) => {
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
      <Badge value={`+${selected.length - MAX_BADGES} more`} isMore />
    </span>
  );
};

export default Badges;

