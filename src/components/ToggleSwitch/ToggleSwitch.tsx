import type { TToggleSwitchProps } from './ToggleSwitch.types';

const ToggleSwitch = ({ isActive, label, ...props }: TToggleSwitchProps) => {
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <label
      className='toggle-switch'
      style={{ alignItems: 'center', display: 'inline-flex' }}
    >
      <input
        {...props}
        checked={isActive}
        style={{
          height: 0,
          opacity: 0,
          position: 'absolute',
          width: 0,
        }}
        type='checkbox'
        onClick={handleInputClick}
      />
      <span
        style={{
          background: isActive ? '#1976d2' : '#ccc',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'inline-block',
          height: '20px',
          position: 'relative',
          transition: 'background 0.3s',
          width: '40px',
        }}
      >
        <span
          style={{
            background: 'white',
            borderRadius: '50%',
            bottom: '2px',
            content: '""',
            height: '16px',
            left: isActive ? '22px' : '2px',
            position: 'absolute',
            transition: 'left 0.3s',
            width: '16px',
          }}
        />
      </span>
      {label && (
        <small style={{ color: '#666', fontSize: '0.8em', marginLeft: '8px' }}>
          {label}
        </small>
      )}
    </label>
  );
};

export default ToggleSwitch;

