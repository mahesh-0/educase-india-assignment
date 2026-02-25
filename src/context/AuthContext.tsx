import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthContextType, User, StoredAccount } from '../types';

const ACCOUNTS_KEY = 'popx_accounts';
const SESSION_KEY = 'popx_session';

const emptyUser: User = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  isAgency: true,
};

function getAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) as StoredAccount[] : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getSession(): { user: User; authenticated: boolean } {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const session = JSON.parse(raw) as { user: User; authenticated: boolean };
      return session;
    }
  } catch { /* ignore */ }
  return { user: emptyUser, authenticated: false };
}

function saveSession(user: User, authenticated: boolean) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, authenticated }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = getSession();
  const [isAuthenticated, setIsAuthenticated] = useState(session.authenticated);
  const [user, setUser] = useState<User>(session.user);

  const login = useCallback((email: string, password: string): string | null => {
    const accounts = getAccounts();
    const account = accounts.find(
      (a) => a.user.email.toLowerCase() === email.toLowerCase()
    );
    if (!account) {
      return 'No account found with this email. Please sign up first.';
    }
    if (account.password !== password) {
      return 'Incorrect password. Please try again.';
    }
    setUser(account.user);
    setIsAuthenticated(true);
    saveSession(account.user, true);
    return null;
  }, []);

  const signup = useCallback((newUser: User, password: string): string | null => {
    const accounts = getAccounts();
    const exists = accounts.some(
      (a) => a.user.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (exists) {
      return 'An account with this email already exists. Please login instead.';
    }
    accounts.push({ user: newUser, password });
    saveAccounts(accounts);
    setUser(newUser);
    setIsAuthenticated(true);
    saveSession(newUser, true);
    return null;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(emptyUser);
    clearSession();
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      // Also update in accounts storage
      const accounts = getAccounts();
      const idx = accounts.findIndex(
        (a) => a.user.email.toLowerCase() === prev.email.toLowerCase()
      );
      if (idx !== -1) {
        accounts[idx].user = updated;
        saveAccounts(accounts);
      }
      saveSession(updated, true);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
