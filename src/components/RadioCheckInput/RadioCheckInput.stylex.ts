import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  maxWidths,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  customCheck: {
    alignContent: 'flex-start',
    alignItems: 'center',
    containerName: 'custom-check',
    containerType: 'inline-size',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: spacing.sm,
    height: '28px',
    justifyContent: 'center',
    margin: 0,
    maxWidth: '100cqw',
    minWidth: 0,
    padding: spacing.none,
    position: 'relative',
    width: maxWidths.full,
  },
  input: {
    margin: spacing.none,
    padding: spacing.none,
    visibility: 'hidden',
    width: 0,
  },
  labelText: {
    marginLeft: spacing.sm,
    maxWidth: `calc(${maxWidths.fullContainerW} - 20px - 0.8rem)`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mark: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: border.sm,
    borderRadius: borderRadius.sm,
    display: 'flex',
    height: '20px',
    justifyContent: 'center',
    position: 'relative',
    transition: 'background-color 0.2s',
    width: '20px',
  },
  markAfter: {
    content: "''",
    display: 'none',
    // position: 'absolute',
  },
  markAfterCheckbox: {
    border: 'solid var(--text-color-1)',
    borderWidth: '0 2px 1px 0',
    height: '8px',
    left: '6px',
    top: '2px',
    transform: 'rotate(45deg)',
    width: '6px',
  },
  markAfterChecked: {
    display: 'block',
  },
  markCheck: {
    border: 'solid var(--text-color-2)',
    borderWidth: '0 2px 1px 0',
    height: '10px',
    left: '6px',
    opacity: 1,
    pointerEvents: 'none',
    // position: 'absolute',
    top: '3px',
    transform: 'rotate(45deg)',
    transition: 'opacity 0.2s',
    width: '6px',
  },
  markCheckHidden: {
    opacity: 0,
  },
  markChecked: {
    backgroundColor: 'var(--background-color-9)',
  },
  markRadio: {
    borderRadius: '50%',
  },
});
