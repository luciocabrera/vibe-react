export type MultiSelectDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (sel: string[]) => void;
  onReset: () => void;
};

