export interface User {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  isAgency: boolean;
}

export interface StoredAccount {
  user: User;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (email: string, password: string) => string | null;
  signup: (user: User, password: string) => string | null;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  isValid?: boolean;
  touched?: boolean;
  onBlur?: () => void;
}

export interface RadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}
