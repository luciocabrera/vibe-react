import { memo } from 'react';

type TSortDirectionButtonProps = {
  direction: 'asc' | 'desc';
  onClick: () => void;
};

const SortDirectionButton = memo(
  ({ direction, onClick }: TSortDirectionButtonProps) => (
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
      onClick={onClick}
    >
      {direction === 'asc' ? '▲' : '▼'}
    </button>
  )
);

type TDeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton = memo(({ onClick }: TDeleteButtonProps) => (
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
    onClick={onClick}
  >
    ✕
  </button>
));

type TSortItemControlsProps = {
  direction: 'asc' | 'desc';
  onDelete: () => void;
  onToggleDirection: () => void;
};

const SortItemControls = memo(
  ({ direction, onDelete, onToggleDirection }: TSortItemControlsProps) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
      <SortDirectionButton direction={direction} onClick={onToggleDirection} />
      <DeleteButton onClick={onDelete} />
    </div>
  )
);

export { SortItemControls };

