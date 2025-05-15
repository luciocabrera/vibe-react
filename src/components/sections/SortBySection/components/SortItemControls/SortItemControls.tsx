import type { TSortItemControlsProps } from './SortItemControls.types';

const SortItemControls = ({
  direction,
  onDelete: handleDelete,
  onToggleDirection: handleToggleDirection,
}: TSortItemControlsProps) => (
  <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
    <button
      style={{
        background: 'transparent',
        border: 'none',
        color: '#1976d2',
        cursor: 'pointer',
        fontSize: '1.1em',
        padding: '4px 8px',
      }}
      type='button'
      onClick={handleToggleDirection}
    >
      {direction === 'asc' ? '▲' : '▼'}
    </button>
    <button
      style={{
        background: 'transparent',
        border: 'none',
        color: '#ff4444',
        cursor: 'pointer',
        fontSize: '1.1em',
        marginLeft: 8,
        padding: '4px 8px',
      }}
      type='button'
      onClick={handleDelete}
    >
      ✕
    </button>
  </div>
);
export default SortItemControls;
