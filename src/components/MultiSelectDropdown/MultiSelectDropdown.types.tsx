export type MultiSelectDropdownProps = {
  label: string;
  onChange: (sel: string[]) => void;
  onReset: () => void;
  options: string[];
  parentId: string;
  selected: string[];
};

