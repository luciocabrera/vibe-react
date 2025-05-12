import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  ul: {
    alignItems: 'stretch', // Ensure children stretch to full width
    display: 'flex',
    flex: 1, // Allow the list to grow and fill available space
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '12px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
  },
});
