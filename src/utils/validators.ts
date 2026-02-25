export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateFullName = (value: string): ValidationResult => {
  if (!value.trim()) return { valid: false, message: "Full name is required" };
  if (value.trim().length < 2)
    return { valid: false, message: "Name must be at least 2 characters" };
  if (value.trim().length > 50)
    return { valid: false, message: "Name must be under 50 characters" };
  if (!/^[a-zA-Z\s]+$/.test(value))
    return { valid: false, message: "Only letters and spaces allowed" };
  return { valid: true, message: "" };
};

export const validatePhone = (value: string): ValidationResult => {
  if (!value.trim())
    return { valid: false, message: "Phone number is required" };
  const digits = value.replace(/[\s\-()]/g, "");
  if (!/^\d{10}$/.test(digits))
    return { valid: false, message: "Enter a valid 10-digit phone number" };
  return { valid: true, message: "" };
};

export const validateEmail = (value: string): ValidationResult => {
  if (!value.trim())
    return { valid: false, message: "Email address is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return { valid: false, message: "Enter a valid email address" };
  return { valid: true, message: "" };
};

export interface PasswordValidation extends ValidationResult {
  strength: "weak" | "medium" | "strong" | "very-strong";
  rules: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export const validatePassword = (value: string): PasswordValidation => {
  const rules = {
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
  };
  const count = Object.values(rules).filter(Boolean).length;
  const strength: PasswordValidation["strength"] =
    count <= 1
      ? "weak"
      : count === 2
        ? "medium"
        : count === 3
          ? "strong"
          : "very-strong";
  if (!value)
    return {
      valid: false,
      message: "Password is required",
      strength: "weak",
      rules,
    };
  if (!rules.length)
    return {
      valid: false,
      message: "At least 8 characters required",
      strength,
      rules,
    };
  if (!rules.uppercase)
    return {
      valid: false,
      message: "Add at least one uppercase letter",
      strength,
      rules,
    };
  if (!rules.number)
    return {
      valid: false,
      message: "Add at least one number",
      strength,
      rules,
    };
  if (!rules.special)
    return {
      valid: false,
      message: "Add at least one special character (!@#$%^&*)",
      strength,
      rules,
    };
  return { valid: true, message: "", strength, rules };
};

export const validateCompanyName = (value: string): ValidationResult => {
  if (!value.trim())
    return { valid: false, message: "Company Name is Required" };
  if (value.trim().length < 2)
    return {
      valid: false,
      message: "Company name must be at least 2 characters",
    };
  return { valid: true, message: "" };
};

export const validateLoginPassword = (value: string): ValidationResult => {
  if (!value) return { valid: false, message: "Password is required" };
  if (value.length < 6)
    return { valid: false, message: "Password must be at least 6 characters" };
  return { valid: true, message: "" };
};
