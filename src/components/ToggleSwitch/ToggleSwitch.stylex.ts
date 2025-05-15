import * as stylex from '@stylexjs/stylex';

import { fontSizes, spacing } from '@/styles/tokens.stylex';

export const styles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  input: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  label: {
    color: '#666',
    fontSize: fontSizes.xs,
    marginLeft: spacing.sm,
  },
  thumb: (isActive: boolean) => ({
    background: 'white',
    borderRadius: '50%',
    bottom: '2px',
    content: '""',
    height: '16px',
    left: isActive ? '22px' : '2px',
    position: 'absolute',
    transition: 'left 0.3s',
    width: '16px',
  }),
  track: (isActive: boolean) => ({
    background: isActive ? 'var(--background-color-1)' : '#ccc',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-block',
    height: '20px',
    position: 'relative',
    transition: 'background 0.3s',
    width: '40px',
  }),
});
