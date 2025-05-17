import type { Dispatch, ReactNode, RefObject } from "react";

export type TMultiSelectDropdownHeaderProps = {
  children: ReactNode;
  instanceId: string;
  onReset: () => void;
  // onDropDownClick: React.MouseEventHandler<HTMLButtonElement>;
  onSetOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  parentRef?: RefObject<HTMLElement>;
};
