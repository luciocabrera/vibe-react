import type { RangeInputProps } from './RangeInput.types';

export const RangeInput = ({
  label,
  onChange,
  onReset,
  value,
}: RangeInputProps) => (
  <div style={{ display: 'inline-block', marginRight: 18 }}>
    <label>{label}:</label>
    <input
      placeholder='Min'
      style={{ marginLeft: 6, width: 70 }}
      type='number'
      value={value[0]}
      onChange={e =>
        onChange(e.target.value === '' ? '' : Number(e.target.value), value[1])
      }
    />
    {' - '}
    <input
      placeholder='Max'
      style={{ width: 70 }}
      type='number'
      value={value[1]}
      onChange={e =>
        onChange(value[0], e.target.value === '' ? '' : Number(e.target.value))
      }
    />
    <button style={{ marginLeft: 4 }} type='button' onClick={onReset}>
      ⟳
    </button>
  </div>
);

export default RangeInput;

