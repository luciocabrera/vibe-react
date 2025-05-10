import { memo } from 'react';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import type { TColumnToggleProps } from './ColumnToggle.types';

const ColumnToggle = memo(
  ({ id, isVisible, label, onToggle }: TColumnToggleProps) => (
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
        onChange={() => onToggle(id)}
      />
    </div>
  )
);

export default ColumnToggle;

