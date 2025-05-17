import * as stylex from '@stylexjs/stylex';

export const spacing = stylex.defineVars({
  none: '0',
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  '4xl': '2.25rem', // 36px
  '5xl': '2.5rem', // 40px
  '6xl': '2.75rem', // 44px
  '7xl': '3rem', // 48px
  '8xl': '3.25rem', // 52px
  '9xl': '3.5rem', // 56px
  '10xl': '3.75rem', // 60px
  '11xl': '4rem', // 64px
  '12xl': '4.25rem', // 68px
});

export const borderRadius = stylex.defineVars({
  none: '0',
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  pill: '9999px',
});

export const border = stylex.defineVars({
  none: 'none',
  xs: '1px solid var(--border-color-2)',
  sm: '1px solid var(--border-color-4)',
  md: '2px solid var(--border-color-1)',
  lg: '3px solid var(--border-color-3)',
});

export const fontSizes = stylex.defineVars({
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.25rem', // 20px
  xl: '1.5rem', // 24px
});

export const fontFamily = stylex.defineVars({
  base: 'Inter, Arial, sans-serif',
});

export const maxWidths = stylex.defineVars({
  fullContainerW: '100cqw',
  full: '100%',
});

export const shadows = stylex.defineVars({
  none: 'none',
  sm: '0px 1px 2px 1px rgba(0,0,0,0.5)',
  md: '0px 1px 5px 1px rgba(0,0,0,0.75)',
  lg: '0 4px 16px rgba(0,0,0,0.15)',
});

// export const shadows = stylex.defineVars({
//   none: 'none',
//   sm: '0 1px 2px rgba(0,0,0,0.05)',
//   md: '0 2px 8px rgba(0,0,0,0.10)',
//   lg: '0 4px 16px rgba(0,0,0,0.15)',
// });

export const animations = stylex.defineVars({
  fast: '150ms cubic-bezier(0.4,0,0.2,1)',
  normal: '300ms cubic-bezier(0.4,0,0.2,1)',
  slow: '600ms cubic-bezier(0.4,0,0.2,1)',
  bounce: 'bounce 1s infinite',
});
