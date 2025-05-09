import { useEffect, useRef, useState } from 'react';
import type { MultiSelectDropdownProps } from './MultiSelectDropdown.types';

const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  onReset,
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
        position: 'relative',
        minWidth: 160,
      }}
    >
      <label>{label}:</label>
      <button
        type='button'
        onClick={() => setOpen(o => !o)}
        style={{
          marginLeft: 6,
          minWidth: 120,
          border: '1px solid #ccc',
          borderRadius: 4,
          background: '#fff',
          padding: '6px 10px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {(() => {
          if (allSelected) return 'All';
          if (selected.length === 0) return 'None';
          if (selected.length === 1) return selected[0];
          return `${selected[0]}, +${selected.length - 1} more`;
        })()}
      </button>
      <button type='button' onClick={onReset} style={{ marginLeft: 4 }}>
        ⟳
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 4,
            minWidth: 180,
            maxHeight: 220,
            overflowY: 'auto',
            boxShadow: '0 2px 8px #0002',
            marginTop: 2,
          }}
        >
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              borderBottom: '1px solid #eee',
              marginBottom: 4,
              padding: '4px 10px',
            }}
          >
            <input
              type='checkbox'
              checked={allSelected}
              ref={el => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={e => onChange(e.target.checked ? [...options] : [])}
            />{' '}
            Select All
          </label>
          {options.map(opt => (
            <label key={opt} style={{ display: 'block', padding: '4px 10px' }}>
              <input
                type='checkbox'
                checked={selected.includes(opt)}
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

