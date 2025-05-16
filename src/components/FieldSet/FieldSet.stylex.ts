import * as stylex from '@stylexjs/stylex';

import { border, borderRadius, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  errorMessage: {
    color: 'var(--danger)',
    display: 'block',
    marginTop: spacing.sm,
    maxHeight: '18px',
    maxWidth: { '@container fieldBase ': '100%' },
    minHeight: '18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fieldBase: {
    containerName: 'fieldBase',
    containerType: 'inline-size',
    flex: 1,
    minWidth: '300px',
    padding: spacing.none,
  },
  fieldset: {
    alignContent: 'stretch',
    border: border.sm,
    borderRadius: borderRadius.sm,
    color: 'var(--text-color-1)',
    display: 'flex',
    flexWrap: 'wrap',
    padding: spacing.none,
  },
  label: { fontWeight: 'bold', padding: `${spacing.none} ${spacing.sm}` },
  legend: { marginLeft: spacing.sm },
  legendIcon: { fontSize: '11px', paddingLeft: spacing.sm },
  maxWidth: (maxWidth) => ({ maxWidth }),
  minWidth: (minWidth) => ({ minWidth }),
  notReadonly: {
    ':focus-within': {
      background: '#ffffff',
      boxShadow:
        '10px 10px 30px 0px var(--background-color-10), -30px -30px 60px #ffffff',
    },
  },
  readonly: { background: '#d3d3d36e' },
  size: (size) => ({ maxWidth: size, minWidth: size, width: size }),
  width: (width) => ({ width }),
});
