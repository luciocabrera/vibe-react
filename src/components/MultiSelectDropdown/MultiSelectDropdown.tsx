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
        display: 'inline-flex',
        paddingLeft: '1rem',
        paddingTop: '0.5rem',
        width: '100%',
      }}
    >
      {/* <label>{label}:</label> */}
      <button
        style={{
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          cursor: 'pointer',

          minWidth: 120,
          padding: '6px 10px',
          textAlign: 'left',
          width: '100%',
        }}
        type='button'
        onClick={handleDropdownClick}
      >
        {(() => {
          if (allSelected) return 'All';
          if (selected.length === 0) return 'None';
          if (selected.length === 1) return selected[0];
          return `${selected[0]}, +${selected.length - 1} more`;
        })()}
      </button>
      <button style={{ marginLeft: 4 }} type='button' onClick={handleReset}>
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
              onChange={handleSelectAll}
            />{' '}
            Select All
          </label>
          {options.map(opt => (
            <label key={opt} style={{ display: 'block', padding: '4px 10px' }}>
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

