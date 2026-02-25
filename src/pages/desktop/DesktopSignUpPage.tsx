import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import InputField from '../../components/InputField';
import RadioButton from '../../components/RadioButton';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';
import { useAuth } from '../../context/AuthContext';
import { validateFullName, validatePhone, validateEmail, validatePassword, validateCompanyName } from '../../utils/validators';

const fieldVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const benefits = [
  'Access to 50,000+ verified creators',
  'Real-time campaign analytics',
  'Automated payment processing',
  'Dedicated account support',
];

export default function DesktopSignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [fields, setFields] = useState({ fullName: '', phone: '', email: '', password: '', companyName: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAgency, setIsAgency] = useState(true);
  const [authError, setAuthError] = useState('');

  const validations = {
    fullName: validateFullName(fields.fullName), phone: validatePhone(fields.phone),
    email: validateEmail(fields.email), password: validatePassword(fields.password),
    companyName: validateCompanyName(fields.companyName),
  };

  const isFormValid = validations.fullName.valid && validations.phone.valid && validations.email.valid && validations.password.valid && validations.companyName.valid;

  const updateField = (name: string, value: string) => { setFields((f) => ({ ...f, [name]: value })); setAuthError(''); };
  const touchField = (name: string) => { setTouched((t) => ({ ...t, [name]: true })); };

  const handleSignup = () => {
    if (!isFormValid) {
      setTouched({ fullName: true, phone: true, email: true, password: true, companyName: true });
      return;
    }
    const error = signup(
      { fullName: fields.fullName, email: fields.email, phone: fields.phone, companyName: fields.companyName, isAgency },
      fields.password,
    );
    if (error) { setAuthError(error); return; }
    navigate('/settings');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex min-h-screen" style={{ background: '#f7f8fa' }}>
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="relative flex flex-col justify-center overflow-hidden"
        style={{ width: '40%', padding: '80px 60px', background: '#f0ecf9' }}
      >
        <div className="absolute rounded-full" style={{ width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(108,43,217,0.1) 0%, transparent 70%)', top: '15%', left: '-5%', animation: 'float1 8s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(108,43,217,0.06) 0%, transparent 70%)', bottom: '20%', right: '10%', animation: 'float2 10s ease-in-out infinite' }} />

        <div className="relative z-10">
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 700, color: '#6C2BD9', marginBottom: '32px' }}>PopX</p>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '42px', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '16px' }}>Start Your Journey</h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, marginBottom: '40px', maxWidth: '380px' }}>
            Create your free PopX account and start connecting with top creators and brands today.
          </p>
          <div className="flex flex-col gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: '24px', height: '24px', background: 'rgba(34,197,94,0.12)' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: '14px', color: '#666' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -20px); } }
          @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 25px); } }
        `}</style>
      </motion.div>

      {/* Right Panel — Form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="flex-1 overflow-y-auto" style={{ background: '#fff', padding: '48px' }}
      >
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginBottom: '32px' }}>Create Your Account</h2>

          <AnimatePresence>
            {authError && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#DC2626' }}>
                {authError}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.07 }}>
            <motion.div variants={fieldVariants}>
              <InputField label="Full Name*" placeholder="Jane Doe" type="text" value={fields.fullName}
                onChange={(e) => updateField('fullName', e.target.value)} onBlur={() => touchField('fullName')}
                touched={touched.fullName} isValid={validations.fullName.valid} error={validations.fullName.message} required />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <InputField label="Phone number*" placeholder="1234567890" type="tel" value={fields.phone}
                onChange={(e) => updateField('phone', e.target.value)} onBlur={() => touchField('phone')}
                touched={touched.phone} isValid={validations.phone.valid} error={validations.phone.message} required />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <InputField label="Email address*" placeholder="you@example.com" type="email" value={fields.email}
                onChange={(e) => updateField('email', e.target.value)} onBlur={() => touchField('email')}
                touched={touched.email} isValid={validations.email.valid} error={validations.email.message} required />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <InputField label="Password *" placeholder="Create a strong password" type="password" value={fields.password}
                onChange={(e) => updateField('password', e.target.value)} onBlur={() => touchField('password')}
                touched={touched.password} isValid={validations.password.valid} error={validations.password.message} required />
            </motion.div>
          </motion.div>

          <PasswordStrengthBar strength={validations.password.strength} show={touched.password === true && fields.password.length > 0} />

          <InputField label="Company name" placeholder="Your company" type="text" value={fields.companyName}
            onChange={(e) => updateField('companyName', e.target.value)} onBlur={() => touchField('companyName')}
            touched={touched.companyName} isValid={validations.companyName.valid} error={validations.companyName.message} />

          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>
              Are you an Agency?<span style={{ color: '#6C2BD9' }}>*</span>
            </p>
            <div className="flex items-center" style={{ gap: '24px' }}>
              <RadioButton label="Yes" selected={isAgency} onSelect={() => setIsAgency(true)} />
              <RadioButton label="No" selected={!isAgency} onSelect={() => setIsAgency(false)} />
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSignup}
            className="w-full cursor-pointer border-none text-white"
            style={{ height: '52px', background: '#6C2BD9', fontWeight: 600, fontSize: '16px', borderRadius: '8px' }}>
            Create Account
          </motion.button>

          <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '20px' }}>
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/login')} className="bg-transparent border-none cursor-pointer p-0"
              style={{ color: '#6C2BD9', fontWeight: 600, fontSize: '13px' }}>Sign In</button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
