import type { ComponentProps } from "react";

export type TDrawerProps = ComponentProps<"aside"> & {
  isPinned?: boolean;
  onClose: () => void;
  onPinChange?: (isPinned: boolean) => void;
  open: boolean;
};
