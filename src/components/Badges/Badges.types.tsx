import type { RefObject } from "react";

export type TBadgesProps = {
  onRemove?: (val: string) => void;
  options: string[];
  parentRef?: RefObject<HTMLElement>;
  selected: string[];
};

