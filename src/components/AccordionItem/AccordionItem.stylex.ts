import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 0,
    width: '100%',
  },
  details: {
    border: '1px solid lightgrey',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontFamily: 'sans-serif',
    width: '100%',
  },
  summary: {
    cursor: 'pointer',
    padding: '1rem',
  },
});
