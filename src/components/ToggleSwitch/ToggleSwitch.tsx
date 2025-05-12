import * as stylex from '@stylexjs/stylex';

import { styles } from './ToggleSwitch.stylex';
import type { TToggleSwitchProps } from './ToggleSwitch.types';

const ToggleSwitch = ({ isActive, label, ...props }: TToggleSwitchProps) => {
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <label {...stylex.props(styles.container)}>
      <input
        {...props}
        checked={isActive}
        {...stylex.props(styles.input)}
        type='checkbox'
        onClick={handleInputClick}
      />
      <span {...stylex.props(styles.track(isActive))}>
        <span {...stylex.props(styles.thumb(isActive))} />
      </span>
      {label && <small {...stylex.props(styles.label)}>{label}</small>}
    </label>
  );
};

export default ToggleSwitch;
