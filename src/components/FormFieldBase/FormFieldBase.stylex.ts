import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  errorMessage: {
    color: '#cf1010',
    display: 'block',
    marginTop: '0.3rem',
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
    padding: 0,
  },
  fieldset: {
    alignContent: 'stretch',
    border: '1px solid',
    borderRadius: 'var(--border-radius-sm)',
    color: 'var(--color-2)',
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
  },
  label: { fontWeight: 'bold', padding: '0 0.5rem' },
  legend: { marginLeft: '0.5rem' },
  legendIcon: { fontSize: '11px', paddingLeft: '6px' },
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
