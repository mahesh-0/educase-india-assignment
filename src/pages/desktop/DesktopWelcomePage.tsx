import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function DesktopWelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen" style={{ background: '#f7f8fa' }}
    >
      {/* Left Half — Brand */}
      <motion.div
        initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="relative flex-1 flex flex-col justify-center overflow-hidden"
        style={{ padding: '80px 60px', background: '#f0ecf9' }}
      >
        <div className="absolute rounded-full" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(108,43,217,0.1) 0%, transparent 70%)', top: '10%', left: '-10%', animation: 'float1 8s ease-in-out infinite' }} />
        <div className="absolute rounded-full" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(108,43,217,0.06) 0%, transparent 70%)', bottom: '15%', right: '5%', animation: 'float2 10s ease-in-out infinite' }} />

        <div className="relative z-10">
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '56px', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '12px' }}>
            Grow Your Brand.
          </h1>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '48px', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px', color: '#6C2BD9' }}>
            Connect. Create. Scale.
          </h2>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.7, maxWidth: '480px', marginBottom: '48px' }}>
            Join thousands of agencies and creators managing campaigns, tracking analytics, and building partnerships — all in one place.
          </p>

          <div className="flex gap-4">
            {[{ value: '50K+', label: 'Creators' }, { value: '12K+', label: 'Brands' }, { value: '98%', label: 'Satisfaction' }].map((stat) => (
              <div key={stat.label} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '16px', padding: '20px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#6C2BD9', fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Half — CTA */}
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className="flex-1 flex flex-col items-center justify-center"
        style={{ background: '#fff' }}
      >
        <div style={{ width: '100%', maxWidth: '380px', padding: '0 24px' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: 700, color: '#6C2BD9', marginBottom: '8px' }}>PopX</p>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 600, color: '#111', marginBottom: '40px' }}>Get Started</h3>

          <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/signup')}
            className="w-full cursor-pointer border-none text-white"
            style={{ height: '52px', background: '#6C2BD9', fontWeight: 600, fontSize: '16px', borderRadius: '8px', marginBottom: '14px' }}>
            Create Account
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')}
            className="w-full cursor-pointer"
            style={{ height: '52px', background: '#D6C9F0', border: 'none', color: '#6C2BD9', fontWeight: 600, fontSize: '16px', borderRadius: '8px' }}>
            Already Registered? Login
          </motion.button>
          <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '24px', lineHeight: 1.5 }}>
            By continuing you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -20px); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 25px); } }
      `}</style>
    </motion.div>
  );
}
