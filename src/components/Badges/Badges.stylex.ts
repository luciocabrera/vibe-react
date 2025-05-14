import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  badgesContainer: {
    boxSizing: 'border-box',
    containerName: 'badges-container',
    containerType: 'normal',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    maxWidth: '100%',
    minWidth: 0,
    overflow: 'hidden',
    padding: '1rem',
  },
});
