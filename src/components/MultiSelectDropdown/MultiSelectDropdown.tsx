import { useEffect, useRef, useState } from 'react';

import type { MultiSelectDropdownProps } from './MultiSelectDropdown.types';

const MultiSelectDropdown = ({
  label,
  onChange,
  onReset,
  options,
  selected,
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

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-block',
        marginRight: 16,
        minWidth: 160,
        position: 'relative',
      }}
    >
      <label>{label}:</label>
      <button
        style={{
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          cursor: 'pointer',
          marginLeft: 6,
          minWidth: 120,
          padding: '6px 10px',
          textAlign: 'left',
        }}
        type='button'
        onClick={() => setOpen(o => !o)}
      >
        {(() => {
          if (allSelected) return 'All';
          if (selected.length === 0) return 'None';
          if (selected.length === 1) return selected[0];
          return `${selected[0]}, +${selected.length - 1} more`;
        })()}
      </button>
      <button style={{ marginLeft: 4 }} type='button' onClick={onReset}>
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
            minWidth: 180,
            overflowY: 'auto',
            position: 'absolute',
            zIndex: 10,
          }}
        >
          <label
            style={{
              borderBottom: '1px solid #eee',
              display: 'block',
              fontWeight: 'bold',
              marginBottom: 4,
              padding: '4px 10px',
            }}
          >
            <input
              ref={el => {
                if (el) el.indeterminate = someSelected;
              }}
              checked={allSelected}
              type='checkbox'
              onChange={e => onChange(e.target.checked ? [...options] : [])}
            />{' '}
            Select All
          </label>
          {options.map(opt => (
            <label key={opt} style={{ display: 'block', padding: '4px 10px' }}>
              <input
                checked={selected.includes(opt)}
                type='checkbox'
                onChange={e => {
                  if (e.target.checked) onChange([...selected, opt]);
                  else onChange(selected.filter(v => v !== opt));
                }}
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

