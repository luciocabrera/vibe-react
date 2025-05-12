import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  badgesContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    // ✅ allow wrapping
    gap: '0.5rem',
    maxWidth: '100%',
    // ✅ prevent any spillover
    minWidth: 0,

    overflow: 'hidden',
    padding: '1rem', // ✅ allow shrink inside flex parent
  },
});
