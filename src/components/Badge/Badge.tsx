import type { BadgeProps } from './Badge.types';

const Badge = ({ value, onRemove, isMore }: BadgeProps) => (
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

