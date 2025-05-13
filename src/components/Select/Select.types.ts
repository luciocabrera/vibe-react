import type { ComponentPropsWithRef } from 'react';

import type { TFormFieldBase } from '../FormFieldBase/FormFieldBase.types';

export type TSelectProps = ComponentPropsWithRef<'select'> &
  Pick<TFormFieldBase, 'label' | 'options'> & {
    showDefaultOption?: boolean;
  };
