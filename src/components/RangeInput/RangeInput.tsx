import type { RangeInputProps } from './RangeInput.types';

export const RangeInput = ({
  label,
  value,
  onChange,
  onReset,
}: RangeInputProps) => (
  <div style={{ display: 'inline-block', marginRight: 18 }}>
    <label>{label}:</label>
    <input
      type='number'
      placeholder='Min'
      value={value[0]}
      onChange={e =>
        onChange(e.target.value === '' ? '' : Number(e.target.value), value[1])
      }
      style={{ width: 70, marginLeft: 6 }}
    />
    {' - '}
    <input
      type='number'
      placeholder='Max'
      value={value[1]}
      onChange={e =>
        onChange(value[0], e.target.value === '' ? '' : Number(e.target.value))
      }
      style={{ width: 70 }}
    />
    <button type='button' onClick={onReset} style={{ marginLeft: 4 }}>
      ⟳
    </button>
  </div>
);

export default RangeInput;

