import type { TBadgeProps } from './Badge.types';

const Badge = ({ isMore, onRemove, value }: TBadgeProps) => {
  const handleRemoveClick = () => onRemove?.(value);

  return (
    <span className={`selected-badge${isMore ? ' more' : ''}`}>
      {value}
      {onRemove && !isMore && (
        <button
          className='remove-badge'
          title='Remove'
          type='button'
          onClick={handleRemoveClick}
        >
          &times;
        </button>
      )}
    </span>
  );
};

export default Badge;

