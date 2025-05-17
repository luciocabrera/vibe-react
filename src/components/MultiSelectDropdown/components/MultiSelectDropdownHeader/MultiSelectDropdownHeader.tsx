import { useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { Button } from '@/components/Button';
import { getParentElement } from '@/utils/element/getParentElement';

import { styles } from './MultiSelectDropdownHeader.stylex';
import type { TMultiSelectDropdownHeaderProps } from './MultiSelectDropdownHeader.types';

const MultiSelectDropdownHeader = ({
  children,
  instanceId,
  onReset: handleReset,
  onSetOpen,
  open,
  parentRef,
}: TMultiSelectDropdownHeaderProps) => {
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent any default action

    // If we're inside a parent element that might be clickable (like an accordion),
    // prevent the parent's click event
    const parentElement = getParentElement(parentRef);
    const clickTarget = e.target as HTMLElement;
    if (
      parentElement &&
      (parentElement.contains(clickTarget) || parentElement === clickTarget)
    ) {
      e.nativeEvent.stopImmediatePropagation(); // Stop event completely
    }

    onSetOpen((prev) => !prev); // Toggle dropdown state
  };
  return (
    <div
      ref={labelContainerRef}
      data-instance-id={instanceId}
      data-test-id='multi-select-label'
      id={`${instanceId}-multi-select-label`}
      {...stylex.props(styles.label)}
    >
      <button
        ref={triggerButtonRef}
        aria-expanded={open}
        aria-haspopup='listbox'
        data-instance-id={instanceId}
        {...stylex.props(styles.triggerButton)}
        type='button'
        onClick={handleDropdownClick}
      >
        <div
          data-test-id='selected-items-display'
          id={`${instanceId}-selected-items-display`}
          {...stylex.props(styles.selectedItemsDisplay)}
        >
          {children}
        </div>
      </button>
      <Button
        size='sm'
        title={'Reset'}
        variant='secondary'
        onClick={handleReset}
      >
        ⟳
      </Button>
    </div>
  );
};

export default MultiSelectDropdownHeader;
