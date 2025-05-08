import React from 'react';

export interface BadgeProps {
  value: string;
  onRemove?: (val: string) => void;
  isMore?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ value, onRemove, isMore }) => (
  <span className={`selected-badge${isMore ? ' more' : ''}`}>
    {value}
    {onRemove && !isMore && (
      <button
        className='remove-badge'
        type='button'
        onClick={() => onRemove(value)}
        title='Remove'
      >
        &times;
      </button>
    )}
  </span>
);

export default Badge;
