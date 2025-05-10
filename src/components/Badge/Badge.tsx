import type { TBadgeProps } from './Badge.types';

const Badge = ({ isMore, onRemove, value }: TBadgeProps) => (
  <span className={`selected-badge${isMore ? ' more' : ''}`}>
    {value}
    {onRemove && !isMore && (
      <button
        className='remove-badge'
        title='Remove'
        type='button'
        onClick={() => onRemove(value)}
      >
        &times;
      </button>
    )}
  </span>
);

export default Badge;

