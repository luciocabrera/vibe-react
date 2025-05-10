import { useEffect, useRef, useState } from 'react';

import type { MultiSelectDropdownProps } from './MultiSelectDropdown.types';
const MultiSelectDropdown = ({
  onChange,
  onReset,
  options = [],
  selected = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  const handleDropdownClick = () => setOpen(o => !o);
  const handleReset = () => onReset();
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? [...options] : []);
  };
  const handleOptionChange = (opt: string, checked: boolean) => {
    if (checked) onChange([...selected, opt]);
    else onChange(selected.filter(v => v !== opt));
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'block',
        paddingInline: '1rem',
        paddingBottom: '1rem',
        width: '100%',
        maxWidth: '400px', // Optional: constrain width
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box', // Ensure sizing is reliable
      }}
    >
      <button
        style={{
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          cursor: 'pointer',
          padding: '6px 10px',
          textAlign: 'left',
          width: '100%',
          boxSizing: 'border-box',
        }}
        type='button'
        onClick={handleDropdownClick}
      >
        <span
          style={{
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {(() => {
            if (allSelected) return 'All';
            if (selected.length === 0) return 'None';
            if (selected.length === 1) return selected[0];
            return `${selected[0]}, +${selected.length - 1} more`;
          })()}
        </span>
      </button>

      <button
        type='button'
        onClick={handleReset}
        style={{ marginLeft: '0.5rem' }}
      >
        ⟳
      </button>

      {open && (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 4,
            boxShadow: '0 2px 8px #0002',
            marginTop: 2,
            maxHeight: 220,
            width: '100%', // Ensure it doesn't overflow
            overflowY: 'auto',
            position: 'absolute',
            zIndex: 10,
            left: 0,
            right: 0,
            boxSizing: 'border-box',
          }}
        >
          <label
            style={{
              borderBottom: '1px solid #eee',
              display: 'block',
              fontWeight: 'bold',
              marginBottom: 4,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <input
              ref={el => {
                if (el) el.indeterminate = someSelected;
              }}
              checked={allSelected}
              type='checkbox'
              onChange={handleSelectAll}
            />{' '}
            Select All
          </label>
          {options.map(opt => (
            <label
              key={opt}
              style={{
                display: 'block',
                padding: '4px 10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <input
                checked={selected.includes(opt)}
                type='checkbox'
                onChange={e => handleOptionChange(opt, e.target.checked)}
              />{' '}
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;