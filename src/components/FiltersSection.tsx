import React from 'react';
import type { ColumnDef } from '../App';

export interface FiltersSectionProps {
  columns: ColumnDef[];
  data: Record<string, any>[];
  filterState: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  rangeState: Record<string, [number | '', number | '']>;
  onRangeChange: (key: string, min: number | '', max: number | '') => void;
  onReset: () => void;
  onResetFilter: (key: string) => void;
  onResetRange: (key: string) => void;
}

// --- Constants ---
const MAX_BADGES = 10;

// --- Badge Component ---
interface BadgeProps {
  value: string;
  onRemove?: (val: string) => void;
  isMore?: boolean;
}
const Badge: React.FC<BadgeProps> = ({ value, onRemove, isMore }) => (
  <span className={`selected-badge${isMore ? ' more' : ''}`}>
    {value}
    {onRemove && !isMore && (
      <button
        className='remove-badge'
        type='button'
        onClick={() => onRemove(value)}
        title='Remove'
      >
        &times;
      </button>
    )}
  </span>
);

// --- Badges List Component ---
interface BadgesProps {
  selected: string[];
  options: string[];
  onRemove?: (val: string) => void;
}
const Badges: React.FC<BadgesProps> = ({ selected, options, onRemove }) => {
  if (selected.length === 0) return null;
  if (selected.length === options.length && options.length > 5) {
    return <Badge value='All' />;
  }
  if (selected.length <= MAX_BADGES) {
    return (
      <span className='selected-badges'>
        {selected.map(val => (
          <Badge key={val} value={val} onRemove={onRemove} />
        ))}
      </span>
    );
  }
  // Show MAX_BADGES badges and a "+x more" badge
  return (
    <span className='selected-badges'>
      {selected.slice(0, MAX_BADGES).map(val => (
        <Badge key={val} value={val} onRemove={onRemove} />
      ))}
      <Badge value={`+${selected.length - MAX_BADGES} more`} isMore />
    </span>
  );
};

// --- MultiSelectDropdown Component ---
interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (sel: string[]) => void;
  onReset: () => void;
}
const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
  onReset,
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
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
        {allSelected
          ? 'All'
          : selected.length === 0
          ? 'None'
          : selected.length === 1
          ? selected[0]
          : `${selected[0]}, +${selected.length - 1} more`}
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

// --- RangeInput Component ---
interface RangeInputProps {
  label: string;
  value: [number | '', number | ''];
  onChange: (min: number | '', max: number | '') => void;
  onReset: () => void;
}
const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  onChange,
  onReset,
}) => (
  <div style={{ display: 'inline-block', marginRight: 18 }}>
    <label>{label}:</label>
    <input
      type='number'
      placeholder='Min'
      value={value[0]}
      onChange={e =>
        onChange(e.target.value === '' ? '' : Number(e.target.value), value[1])
      }
      style={{ width: 70, marginLeft: 6 }}
    />
    -
    <input
      type='number'
      placeholder='Max'
      value={value[1]}
      onChange={e =>
        onChange(value[0], e.target.value === '' ? '' : Number(e.target.value))
      }
      style={{ width: 70 }}
    />
    <button type='button' onClick={onReset} style={{ marginLeft: 4 }}>
      ⟳
    </button>
  </div>
);

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  columns,
  data,
  filterState,
  onFilterChange,
  rangeState,
  onRangeChange,
  onReset,
  onResetFilter,
  onResetRange,
}) => (
  <div style={{ marginBottom: 16 }}>
    {columns
      .filter(col => col.filterable)
      .map(col => {
        const options = Array.from(
          new Set((data || []).map(row => row[col.key]).filter(Boolean))
        );
        return (
          <React.Fragment key={col.key}>
            <MultiSelectDropdown
              label={col.label}
              options={options}
              selected={filterState[col.key] || []}
              onChange={vals => onFilterChange(col.key, vals)}
              onReset={() => onResetFilter(col.key)}
            />
            <div style={{ marginTop: 4, marginBottom: 12 }}>
              <Badges
                selected={filterState[col.key] || []}
                options={options}
                onRemove={val =>
                  onFilterChange(
                    col.key,
                    (filterState[col.key] || []).filter(v => v !== val)
                  )
                }
              />
            </div>
          </React.Fragment>
        );
      })}
    <button
      type='button'
      onClick={onReset}
      style={{ marginLeft: 12, padding: '6px 16px' }}
    >
      Reset All Filters
    </button>
    <div style={{ marginTop: 10 }}>
      {columns
        .filter(col => col.rangeFilter)
        .map(col => (
          <RangeInput
            key={col.key}
            label={col.label}
            value={rangeState[col.key] || ['', '']}
            onChange={(min, max) => onRangeChange(col.key, min, max)}
            onReset={() => onResetRange(col.key)}
          />
        ))}
    </div>
  </div>
);

