import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  section: {
    background: 'transparent',
    containerName: 'table-layout',
    containerType: 'normal',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '300px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
});
