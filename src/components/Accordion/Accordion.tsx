import * as stylex from '@stylexjs/stylex';

import { styles } from './Accordion.stylex';
import type { AccordionProps } from './Accordion.types';

const Accordion = ({ children }: AccordionProps) => (
  <div data-test-id='accordion' {...stylex.props(styles.container)}>{children}</div>
);

export default Accordion;

