import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import type { TColumnToggleProps } from './ColumnToggle.types';

const ColumnToggle = ({
  id,
  isVisible,
  label,
  onToggle,
}: TColumnToggleProps) => {
  const handleToggle = () => onToggle(id);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
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

