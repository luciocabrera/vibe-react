import * as stylex from '@stylexjs/stylex';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import { styles } from './ColumnToggle.stylex';
import type { TColumnToggleProps } from './ColumnToggle.types';

// TDOO: Check if we really need the id here, the onToggle function should know what to do
// in the parent component
const ColumnToggle = ({
  id,
  isVisible,
  label,
  onToggle,
}: TColumnToggleProps) => {
  const handleToggle = () => onToggle(id);

  return (
    <div {...stylex.props(styles.container)}>
      <span>{label}</span>
      <ToggleSwitch
        isActive={isVisible}
        label={isVisible ? 'Show' : 'Hide'}
        onChange={handleToggle}
      />
    </div>
  );
};

export default ColumnToggle;
