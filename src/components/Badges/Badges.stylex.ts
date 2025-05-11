import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
badgesContainer: {
  display: 'flex',
  flexWrap: 'wrap',         // ✅ allow wrapping
  gap: '0.5rem',
  padding: '1rem',
  maxWidth: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',       // ✅ prevent any spillover
  minWidth: 0,              // ✅ allow shrink inside flex parent
}
});

