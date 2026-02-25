import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function AccountSettingsPage() {
  const { user } = useAuth();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh', background: '#f7f8fa' }}
    >
      {/* Top Bar */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>
          Account Settings
        </h1>
      </div>

      {/* Profile Section */}
      <div style={{ padding: '20px 24px' }}>
        <div className="flex items-center" style={{ gap: '14px' }}>
          {/* Avatar with camera badge */}
          <div className="relative" style={{ flexShrink: 0 }}>
            <motion.img
              src="https://i.pravatar.cc/150?img=47"
              alt="Profile"
              className="rounded-full object-cover"
              style={{ width: '64px', height: '64px' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: '22px',
                height: '22px',
                background: '#6C2BD9',
                bottom: '0',
                right: '0',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>

          {/* Name and Email */}
          <div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>
              {user.fullName}
            </p>
            <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
              {user.email}
            </p>
          </div>
        </div>

        {/* Description text */}
        <p
          style={{
            marginTop: '20px',
            fontSize: '14px',
            color: '#444',
            lineHeight: 1.6,
          }}
        >
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
          Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        {/* Dashed separator */}
        <div style={{ borderBottom: '1px dashed #ccc', margin: '20px 0' }} />

        {/* Empty space */}
        <div style={{ minHeight: '400px' }} />

        {/* Bottom dashed separator */}
        <div style={{ borderBottom: '1px dashed #ccc', margin: '20px 0' }} />
      </div>
    </motion.div>
  );
}
