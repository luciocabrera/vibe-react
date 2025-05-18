export type TMultiSelectDropdownListBodyProps = {
  instanceId: string;
  onChange: (sel: string[]) => void;
  options: string[];
  search?: string;
  selected: string[];
};
