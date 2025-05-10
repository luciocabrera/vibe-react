import * as stylex from '@stylexjs/stylex';

import { styles } from './AccordionItem.stylex';
import type { TAccordionItemProps } from './AccordionItem.types';

const AccordionItem = ({ children, name, title }: TAccordionItemProps) => (
  <details name={name} {...stylex.props(styles.details)}>
    <summary {...stylex.props(styles.summary)}>{title}</summary>
    <div {...stylex.props(styles.content)}>{children}</div>
  </details>
);

export default AccordionItem;

