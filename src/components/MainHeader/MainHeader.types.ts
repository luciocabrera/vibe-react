import type { ComponentPropsWithRef, JSX } from 'react';

export type TMainHeaderProps = ComponentPropsWithRef<'div'> & {
  actions?: JSX.Element;
  customTitle?: JSX.Element;
  icon?: JSX.Element;
  inverse?: boolean;
  showTopRadius?: boolean;
};
