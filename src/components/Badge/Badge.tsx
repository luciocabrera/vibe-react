import * as stylex from '@stylexjs/stylex';

import { styles } from './Badge.stylex';
import type { TBadgeProps } from './Badge.types';

const Badge = ({ isMore, onRemove, value }: TBadgeProps) => {
  const handleRemoveClick = () => onRemove?.(value);

  return (
    <span {...stylex.props(styles.badge, isMore && styles.more)}>
      <span {...stylex.props(styles.value)}>{value}</span>

      {onRemove && !isMore && (
        <button
          {...stylex.props(styles.removeButton)}
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

