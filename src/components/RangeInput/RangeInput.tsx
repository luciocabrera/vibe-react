import type { RangeInputProps } from './RangeInput.types';

export const RangeInput = ({
  onChange,
  onReset: handleReset,
  value = ['', ''],
}: RangeInputProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value === '' ? '' : Number(e.target.value), value[1]);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value[0], e.target.value === '' ? '' : Number(e.target.value));
  };

  return (
    <div style={{ display: 'inline-block', marginRight: 18 }}>
      {/* <label>{label}:</label> */}
      <input
        placeholder='Min'
        style={{ marginLeft: 6, width: 70 }}
        type='number'
        value={value[0]}
        onChange={handleMinChange}
      />
      {' - '}
      <input
        placeholder='Max'
        style={{ width: 70 }}
        type='number'
        value={value[1]}
        onChange={handleMaxChange}
      />
      <button style={{ marginLeft: 4 }} type='button' onClick={handleReset}>
        ⟳
      </button>
    </div>
  );
};

export default RangeInput;

