import * as stylex from '@stylexjs/stylex';

import { styles } from './Accordion.stylex';
import type { AccordionProps } from './Accordion.types';

const Accordion = ({ children }: AccordionProps) => (
  <div {...stylex.props(styles.container)}>{children}</div>
);

export default Accordion;

