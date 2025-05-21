import type { ComponentPropsWithRef } from 'react';

export type DateParameterType = Date | string;
export type DateOutputType = 'date' | 'datetime';

export type TDateDisplayProps = ComponentPropsWithRef<'span'> & {
  iso?: boolean;
  output?: DateOutputType;
  value?: DateParameterType;
};
