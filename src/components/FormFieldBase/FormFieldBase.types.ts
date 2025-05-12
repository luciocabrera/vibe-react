import type { ChangeEvent, ReactNode } from 'react';

import { strArrayToEnum } from '@/utils/data/array';

export const DISPLAY_TO_RENDER_RADIO_TYPE = ['radio'] as const;
export const DISPLAY_TO_RENDER_OPTION_TYPE = ['select', 'dropdown'] as const;
export const DISPLAY_TO_RENDER_CHECK_TYPE = [
  'check',
  'checkbox',
  'checkButton',
] as const;
export const DISPLAY_TO_RENDER_OTHER_TYPE = ['tags', 'label'] as const;
export const RULE_TYPES = [
  'function',
  'required',
  'length',
  'minLength',
  'maxLength',
  'regex',
] as const;
export const FIELD_TYPE_NUMBERS = ['number', 'integer', 'float'] as const;
export const FIELD_TYPE_BOOLEANS = ['boolean'] as const;
export const FIELD_TYPE_DATES = ['date'] as const;
export const FIELD_TYPE_FILES = ['file'] as const;
export const FIELD_TYPE_STRINGS = ['string', 'url', 'text', 'email'] as const;
export const FIELD_TYPE_OTHER = [
  'array',
  'group',
  'row',
  'placeholder',
] as const;
export const FIELDS_TO_RENDER = [
  'checkboxField',
  'children',
  'genericField',
  'selectField',
  'label',
  'numericField',
  'radioField',
  'tagsField',
] as const;

export const DISPLAY_TYPES = [
  ...DISPLAY_TO_RENDER_RADIO_TYPE,
  ...DISPLAY_TO_RENDER_OPTION_TYPE,
  ...DISPLAY_TO_RENDER_CHECK_TYPE,
  ...DISPLAY_TO_RENDER_OTHER_TYPE,
] as const;

export const FIELD_TYPES = [
  ...FIELD_TYPE_NUMBERS,
  ...FIELD_TYPE_BOOLEANS,
  ...FIELD_TYPE_DATES,
  ...FIELD_TYPE_FILES,
  ...FIELD_TYPE_STRINGS,
  ...FIELD_TYPE_OTHER,
] as const;

export const TEXT_ALIGNS = ['left', 'center', 'right'] as const;

type RuleTypeTuple = typeof RULE_TYPES;
type DisplayTuple = typeof DISPLAY_TYPES;
type FieldTypeTuple = typeof FIELD_TYPES;
type TextAlignTuple = typeof TEXT_ALIGNS;

export type TFieldType = FieldTypeTuple[number];
export type TTextAlign = TextAlignTuple[number];
export type TDisplayType = DisplayTuple[number];
export type TFieldValue = number | string | undefined;
export type TFieldRuleType = RuleTypeTuple[number];

export type TFormOption = {
  label: string;
  value: string;
};

export type TFormRule<TData> = {
  message?: string;
  type: TFieldRuleType;
  value: number | string | ((data: TData) => boolean);
};

export type TFormFieldBase<TData> = {
  accessor: keyof TData;
  change?: (value?: TFieldValue) => void;
  default?: string | null;
  disabled?: boolean;
  display?: TDisplayType;
  label: string;
  maxWidth?: number;
  minWidth?: number;
  normalize?: (value?: TFieldValue) => TFieldValue;
  onSelect?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options?: TFormOption[];
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rules?: TFormRule<TData>[];
  size?: number;
  textAlign?: TTextAlign;
  tooltip?: string;
  type: TFieldType;
  value?: TFieldValue;
  width?: number;
};
export type TFormFieldBaseProps<TData> = Pick<
  TFormFieldBase<TData>,
  | 'accessor'
  | 'label'
  | 'maxWidth'
  | 'minWidth'
  | 'readonly'
  | 'required'
  | 'size'
  | 'width'
> & {
  children: ReactNode;
  errorMessage?: string;
  hasErrors?: boolean;
  id?: string;
  isViewing?: boolean;
};

export const DISPLAY_ENUM = strArrayToEnum([...DISPLAY_TYPES]);
export const FIELD_TO_RENDER_ENUM = strArrayToEnum([...FIELDS_TO_RENDER]);
export const FIELD_TYPE_ENUM = strArrayToEnum([...FIELD_TYPES]);
