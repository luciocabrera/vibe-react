import * as stylex from '@stylexjs/stylex';

import { styles } from './AccordionItem.stylex';
import type { TAccordionItemProps } from './AccordionItem.types';
import { useRef } from 'react';
import { injectPropsToChildren } from '../../utils/injectPropsToChildren';

const AccordionItem = ({ children, title, ...props }: TAccordionItemProps) => {
  const ref = useRef<HTMLDetailsElement>(null);

  const enhancedChildren = injectPropsToChildren(children, { parentRef: ref });

  return (
    <details
      ref={ref}
      {...props}
      data-test-id="accordion-item"
      {...stylex.props(styles.details)}
    >
      <summary {...stylex.props(styles.summary)}>{title}</summary>
      <div
        data-test-id="accordion-content"
        {...stylex.props(styles.content)}
      >
        {enhancedChildren}
      </div>
    </details>
  );
}


export default AccordionItem;

