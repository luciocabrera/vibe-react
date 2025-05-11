import type { RefObject } from "react";

export type MultiSelectDropdownProps = {
  label: string;
  onChange: (sel: string[]) => void;
  onReset: () => void;
  options: string[];
  parentId: string;
  parentRef?: RefObject<HTMLElement>;
  selected: string[];
};

