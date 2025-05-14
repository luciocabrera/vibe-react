import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  content: {
    containerName: 'accordion-content-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: '100cqw',
    padding: 0,
    width: '100%',
  },
  details: {
    border: '1px solid lightgrey',
    borderRadius: '5px',
    containerName: 'details-container',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: '100cqw',
    width: '100%',
  },
  summary: {
    cursor: 'pointer',
    padding: '1rem',
  },
});
