import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import InputField from '../../components/InputField';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateLoginPassword } from '../../utils/validators';

export default function DesktopLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [authError, setAuthError] = useState('');

  const emailResult = validateEmail(email);
  const passwordResult = validateLoginPassword(password);
  const isFormValid = emailResult.valid && passwordResult.valid;

  const handleLogin = () => {
    if (!isFormValid) {
      setTouched({ email: true, password: true });
      return;
    }
    setAuthError('');
    const error = login(email, password);
    if (error) {
      setAuthError(error);
      return;
    }
    navigate('/settings');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen"
      style={{ background: '#f7f8fa' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        style={{ width: '100%', maxWidth: '480px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '16px', padding: '48px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
      >
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 700, color: '#6C2BD9', marginBottom: '24px' }}>PopX</p>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>Welcome Back</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px', lineHeight: 1.5 }}>
          Sign in to access your dashboard, campaigns, and creator network.
        </p>
        <div style={{ borderBottom: '1px solid #e8e8e8', marginBottom: '28px' }} />

        <AnimatePresence>
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#DC2626' }}
            >
              {authError}
            </motion.div>
          )}
        </AnimatePresence>

        <InputField label="Email Address" placeholder="Enter email address" type="email"
          value={email} onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          touched={touched.email} isValid={emailResult.valid} error={emailResult.message} />

        <InputField label="Password" placeholder="Enter password" type="password"
          value={password} onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          touched={touched.password} isValid={passwordResult.valid} error={passwordResult.message} />

        <motion.button whileTap={{ scale: 0.97 }} onClick={handleLogin}
          className="w-full cursor-pointer border-none text-white"
          style={{ height: '52px', background: isFormValid ? '#6C2BD9' : '#C4C4C4', fontWeight: 600, fontSize: '16px', borderRadius: '8px', transition: 'background 0.2s', marginTop: '8px' }}>
          Login
        </motion.button>

        <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '24px' }}>
          Don&apos;t have an account?{' '}
          <button type="button" onClick={() => navigate('/signup')}
            className="bg-transparent border-none cursor-pointer p-0"
            style={{ color: '#6C2BD9', fontWeight: 600, fontSize: '13px' }}>
            Create one
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
