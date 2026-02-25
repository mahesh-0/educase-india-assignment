import type { RadioButtonProps } from '../types';

export default function RadioButton({ label, selected, onSelect }: RadioButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0"
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: '20px',
          height: '20px',
          border: selected ? '2px solid #6C2BD9' : '2px solid #ccc',
          background: selected ? '#6C2BD9' : 'transparent',
        }}
      >
        {selected && (
          <span
            className="rounded-full bg-white"
            style={{ width: '6px', height: '6px' }}
          />
        )}
      </span>
      <span className="text-sm text-[#111]">{label}</span>
    </button>
  );
}
