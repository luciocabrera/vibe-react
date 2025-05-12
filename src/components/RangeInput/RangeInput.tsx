import type { RangeInputProps } from './RangeInput.types';
import { styles } from './RangeInput.stylex';
import * as stylex from '@stylexjs/stylex';

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
    <div {...stylex.props(styles.container)}>
      {/* <label>{label}:</label> */}
      <input
        placeholder='Min'
        {...stylex.props(styles.input, styles.leftInput)}
        type='number'
        value={value[0]}
        onChange={handleMinChange}
      />
      {' - '}
      <input
        placeholder='Max'
        {...stylex.props(styles.input)}
        type='number'
        value={value[1]}
        onChange={handleMaxChange}
      />
      <button {...stylex.props(styles.resetButton)} type='button' onClick={handleReset}>
        ⟳
      </button>
    </div>
  );
};

export default RangeInput;

