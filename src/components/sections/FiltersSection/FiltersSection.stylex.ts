import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  container: {
    containerName: 'filter-section-container',
    containerType: 'inline-size',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
});
