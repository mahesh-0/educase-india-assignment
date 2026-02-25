import { motion } from 'motion/react';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description: string;
}

export default function ToggleSwitch({ enabled, onToggle, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div style={{ flex: 1, marginRight: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>
          {label}
        </p>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '2px', lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="relative flex-shrink-0 cursor-pointer border-none p-0"
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: enabled ? '#6C2BD9' : '#ccc',
          transition: 'background 0.2s',
        }}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            background: '#fff',
            position: 'absolute',
            top: '2px',
            left: enabled ? '22px' : '2px',
          }}
        />
      </button>
    </div>
  );
}
