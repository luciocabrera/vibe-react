import * as stylex from '@stylexjs/stylex';

import {
  border,
  borderRadius,
  fontSizes,
  spacing,
} from '@/styles/tokens.stylex';

export const styles = stylex.create({
  addButton: {
    padding: `${spacing.sm} ${spacing.xl}`,
  },
  columnItem: {
    alignItems: 'center',
    background: '#f7faff',
    border: border.xs,
    borderRadius: borderRadius.sm,
    boxSizing: 'border-box',
    cursor: 'grab',
    display: 'flex',
    fontWeight: 500,
    gap: spacing.md,
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
    width: '100%', // Ensure each item takes full width
  },
  columnItemContent: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.md,
  },
  columnItemDragging: {
    background: '#ddeeff',
    boxShadow: '0 2px 8px #1976d244',
    opacity: 0.7,
  },
  columnList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  columnSelect: {
    marginLeft: spacing.sm,
    minWidth: 180,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
  controlsContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm,
  },
  directionButton: {
    background: 'transparent',
    border: 'none',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: fontSizes.lg,
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  dragIcon: {
    color: '#1976d2',
    fontSize: '1.2em',
  },
  moveButton: {
    background: 'transparent',
    border: 'none',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    lineHeight: '1',
    padding: `2px ${spacing.xs}`,
  },
  moveButtonDisabled: {
    color: '#ccc',
    cursor: 'default',
  },
  moveButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    color: '#ff4444',
    cursor: 'pointer',
    fontSize: fontSizes.lg,
    marginLeft: spacing.sm,
    padding: `${spacing.xs} ${spacing.sm}`,
  },
});
