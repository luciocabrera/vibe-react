export type RangeInputProps = {
  label: string;
  onChange: (min: number | '', max: number | '') => void;
  onReset: () => void;
  value: [number | '', number | ''];
};

