import { AnimatePresence, motion } from 'motion/react';

interface PasswordStrengthBarProps {
  strength: "weak" | "medium" | "strong" | "very-strong";
  show: boolean;
  dark?: boolean;
}

const config: Record<string, { count: number; color: string; label: string }> = {
  weak: { count: 1, color: "#EF4444", label: "Weak" },
  medium: { count: 2, color: "#F97316", label: "Medium" },
  strong: { count: 3, color: "#EAB308", label: "Strong" },
  "very-strong": { count: 4, color: "#22C55E", label: "Very Strong" },
};

export default function PasswordStrengthBar({ strength, show, dark }: PasswordStrengthBarProps) {
  const { count, color, label } = config[strength];
  const grayColor = dark ? "#2A2A38" : "#e0e0e0";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-3"
        >
          <div className="flex gap-1 mb-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                layout
                className="flex-1 rounded-full"
                style={{
                  height: "4px",
                  backgroundColor: i < count ? color : grayColor,
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: "11px", color, fontWeight: 500 }}>{label}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
