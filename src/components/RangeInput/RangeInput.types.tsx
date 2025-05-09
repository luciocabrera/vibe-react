export type RangeInputProps = {
  label: string;
  value: [number | '', number | ''];
  onChange: (min: number | '', max: number | '') => void;
  onReset: () => void;
};

