import * as stylex from '@stylexjs/stylex';

import { maxWidths } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    containerName: 'multi-select-container',
    containerType: 'normal',
    maxWidth: maxWidths.fullContainerW,
    overflow: 'visible',
    position: 'relative',
  },
  label: {
    boxSizing: 'border-box',
    display: 'flex',
    maxWidth: maxWidths.full,
    position: 'relative',
    width: maxWidths.full,
  },
  selectedItemsDisplay: {
    // border: border.sm,
    maxWidth: maxWidths.full,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: maxWidths.full,
  },
  triggerButton: {
    alignItems: 'center',
    background: '#fff',
    // border: border.none,
    border: '1px solid #ccc',
    // borderRadius: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    // flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    padding: '6px 10px',
    textAlign: 'left',
    userSelect: 'none',
    width: maxWidths.full,
  },
});
