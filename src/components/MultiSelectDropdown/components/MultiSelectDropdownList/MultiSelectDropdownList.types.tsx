export type TMultiSelectDropdownListProps = {
  onChange: (sel: string[]) => void;
  onClose: () => void;
  options: string[];
  selected: string[];
};
