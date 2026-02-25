import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface DarkInputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  isValid?: boolean;
  touched?: boolean;
  showPasswordToggle?: boolean;
}

export default function DarkInputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  isValid,
  touched,
  showPasswordToggle,
}: DarkInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const showValid = touched && isValid;
  const showError = touched && !isValid && error;

  const borderColor = showError
    ? '#EF4444'
    : showValid
      ? '#22C55E'
      : '#2A2A38';

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div className="relative mb-5">
      <label
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 500,
          color: '#7C3AED',
          marginBottom: '6px',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full transition-colors duration-200"
          style={{
            height: '48px',
            background: '#0F0F14',
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            padding: '0 40px 0 14px',
            color: '#F8FAFC',
            fontSize: '14px',
            fontFamily: "'JetBrains Mono', monospace",
            outline: 'none',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; }}
          onBlurCapture={(e) => { e.target.style.borderColor = borderColor; }}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
        {!showPasswordToggle && showValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        {!showPasswordToggle && showError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </div>
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
