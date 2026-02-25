import { AnimatePresence, motion } from 'motion/react';
import type { InputFieldProps } from '../types';

export default function InputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  isValid,
  touched,
  onBlur,
}: InputFieldProps) {
  const showValid = touched && isValid;
  const showError = touched && !isValid && error;

  const borderColor = showError
    ? '#ef4444'
    : showValid
      ? '#22c55e'
      : '#e0e0e0';

  const focusBorderColor = touched
    ? borderColor
    : '#6C2BD9';

  return (
    <div className="relative mb-4">
      <label
        className="absolute -top-[10px] left-3 bg-white px-1 text-xs font-medium z-10"
        style={{ color: '#6C2BD9', fontSize: '12px' }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-md bg-white px-3.5 text-sm text-[#111] placeholder-[#999] transition-colors duration-200 pr-10"
          style={{
            height: '52px',
            borderRadius: '6px',
            border: `1px solid ${borderColor}`,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = focusBorderColor;
          }}
          onBlurCapture={(e) => {
            e.target.style.borderColor = borderColor;
          }}
        />
        {showValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        {showError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
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
            style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', marginLeft: '2px' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
