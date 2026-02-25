import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import InputField from '../../components/InputField';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useAuth } from '../../context/AuthContext';

type Section = 'profile' | 'security' | 'notifications' | 'billing' | 'help';

const navItems: { label: string; key: Section; icon: string; icon2?: string; icon3?: string }[] = [
  { label: 'Profile', key: 'profile', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', icon2: 'M12 3a4 4 0 100 8 4 4 0 000-8z' },
  { label: 'Security', key: 'security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { label: 'Notifications', key: 'notifications', icon: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9', icon2: 'M13.73 21a2 2 0 01-3.46 0' },
  { label: 'Billing', key: 'billing', icon: 'M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22' },
  { label: 'Help', key: 'help', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20z', icon2: 'M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3', icon3: 'M12 17h.01' },
];

export default function DesktopAccountSettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [formFields, setFormFields] = useState({
    fullName: user.fullName, email: user.email, phone: user.phone,
    companyName: user.companyName, website: '', location: '',
  });
  const [isAgency, setIsAgency] = useState(user.isAgency);
  const [toggles, setToggles] = useState({
    emailNotifications: true, smsAlerts: false, twoFactor: false, publicProfile: true,
  });
  const [securityFields, setSecurityFields] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saved, setSaved] = useState(false);

  const updateField = (name: string, value: string) => setFormFields((f) => ({ ...f, [name]: value }));
  const toggleOption = (key: keyof typeof toggles) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  const handleSave = () => {
    updateUser({ fullName: formFields.fullName, email: formFields.email, phone: formFields.phone, companyName: formFields.companyName, isAgency });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex min-h-screen" style={{ background: '#f7f8fa' }}>

      {/* Sidebar */}
      <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }} className="flex flex-col flex-shrink-0"
        style={{ width: '260px', background: '#fff', borderRight: '1px solid #e8e8e8', padding: '24px 16px' }}>

        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 700, color: '#6C2BD9', marginBottom: '24px', padding: '0 8px' }}>PopX</p>

        <div className="flex items-center gap-3 mb-6" style={{ padding: '0 8px' }}>
          <motion.img src="https://i.pravatar.cc/150?img=47" alt="Profile"
            className="rounded-full object-cover" style={{ width: '40px', height: '40px' }}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{user.fullName}</p>
            <p style={{ fontSize: '11px', color: '#888' }}>{user.email}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button key={item.key} type="button" onClick={() => setActiveSection(item.key)}
              className="flex items-center gap-3 cursor-pointer border-none text-left"
              style={{
                padding: '12px', borderRadius: '10px',
                background: activeSection === item.key ? '#f0ecf9' : 'transparent',
                color: activeSection === item.key ? '#6C2BD9' : '#888',
                fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />{item.icon2 && <path d={item.icon2} />}{item.icon3 && <path d={item.icon3} />}
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer border-none text-left"
          style={{ padding: '12px', borderRadius: '10px', background: 'transparent', color: '#EF4444', fontSize: '14px', fontWeight: 500 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </motion.div>

      {/* Main Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }} className="flex-1 overflow-y-auto">

        <div className="flex items-center justify-between" style={{ padding: '20px 40px', borderBottom: '1px solid #e8e8e8' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#111' }}>Account Settings</h1>
          <div className="flex items-center gap-3">
            {saved && <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: 500 }}>Changes saved!</span>}
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
              className="cursor-pointer border-none text-white"
              style={{ padding: '10px 24px', background: '#6C2BD9', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
              Save Changes
            </motion.button>
          </div>
        </div>

        <div style={{ padding: '32px 40px', maxWidth: '900px' }}>
          {/* PROFILE SECTION */}
          {activeSection === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
                <div className="flex items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <motion.img src="https://i.pravatar.cc/150?img=47" alt="Profile"
                      className="rounded-full object-cover"
                      style={{ width: '96px', height: '96px', outline: '3px solid #6C2BD9', outlineOffset: '2px' }}
                      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} />
                    <div className="absolute flex items-center justify-center rounded-full"
                      style={{ width: '28px', height: '28px', background: '#6C2BD9', bottom: '2px', right: '2px', border: '2px solid #fff' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '20px', fontWeight: 600, color: '#111' }}>{user.fullName}</p>
                    <p style={{ fontSize: '14px', color: '#888', marginTop: '2px' }}>{user.email}</p>
                    <p style={{ fontSize: '12px', color: '#6C2BD9', marginTop: '4px', fontWeight: 500 }}>{user.isAgency ? 'Agency' : 'Creator'}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
                <div className="grid grid-cols-2 gap-x-6">
                  <InputField label="Full Name" placeholder="Jane Doe" value={formFields.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
                  <InputField label="Company Name" placeholder="Your company" value={formFields.companyName} onChange={(e) => updateField('companyName', e.target.value)} />
                  <InputField label="Email Address" placeholder="you@example.com" type="email" value={formFields.email} onChange={(e) => updateField('email', e.target.value)} />
                  <InputField label="Website URL" placeholder="https://yoursite.com" value={formFields.website} onChange={(e) => updateField('website', e.target.value)} />
                  <InputField label="Phone Number" placeholder="1234567890" type="tel" value={formFields.phone} onChange={(e) => updateField('phone', e.target.value)} />
                  <InputField label="Location" placeholder="City, Country" value={formFields.location} onChange={(e) => updateField('location', e.target.value)} />
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px' }}>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Account Type</p>
                <div className="flex gap-3">
                  {(['Agency', 'Creator'] as const).map((option) => {
                    const selected = option === 'Agency' ? isAgency : !isAgency;
                    return (
                      <button key={option} type="button" onClick={() => setIsAgency(option === 'Agency')} className="cursor-pointer"
                        style={{ padding: '10px 28px', borderRadius: '8px', border: `1px solid ${selected ? '#6C2BD9' : '#e0e0e0'}`, background: selected ? '#f0ecf9' : '#fff', color: selected ? '#6C2BD9' : '#888', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s' }}>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* SECURITY SECTION */}
          {activeSection === 'security' && (
            <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>Change Password</h2>
                <div style={{ maxWidth: '400px' }}>
                  <InputField label="Current Password" placeholder="Enter current password" type="password"
                    value={securityFields.currentPassword} onChange={(e) => setSecurityFields((s) => ({ ...s, currentPassword: e.target.value }))} />
                  <InputField label="New Password" placeholder="Enter new password" type="password"
                    value={securityFields.newPassword} onChange={(e) => setSecurityFields((s) => ({ ...s, newPassword: e.target.value }))} />
                  <InputField label="Confirm New Password" placeholder="Confirm new password" type="password"
                    value={securityFields.confirmPassword} onChange={(e) => setSecurityFields((s) => ({ ...s, confirmPassword: e.target.value }))} />
                  <motion.button whileTap={{ scale: 0.97 }} className="cursor-pointer border-none text-white"
                    style={{ padding: '10px 24px', background: '#6C2BD9', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>
                    Update Password
                  </motion.button>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Two-Factor Authentication</h2>
                <ToggleSwitch label="Enable 2FA" description="Add an extra layer of security to your account using an authenticator app"
                  enabled={toggles.twoFactor} onToggle={() => toggleOption('twoFactor')} />
                <div style={{ borderBottom: '1px solid #e8e8e8', margin: '4px 0' }} />
                <div style={{ padding: '16px 0' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Active Sessions</p>
                  <div className="flex items-center justify-between" style={{ padding: '12px 0' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: '#111', fontWeight: 500 }}>Current Browser</p>
                      <p style={{ fontSize: '12px', color: '#888' }}>Last active: Now</p>
                    </div>
                    <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 500, background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeSection === 'notifications' && (
            <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Notification Preferences</h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>Choose how you want to be notified about activity on your account.</p>
                <ToggleSwitch label="Email Notifications" description="Receive updates about your campaigns and messages" enabled={toggles.emailNotifications} onToggle={() => toggleOption('emailNotifications')} />
                <div style={{ borderBottom: '1px solid #e8e8e8' }} />
                <ToggleSwitch label="SMS Alerts" description="Get instant alerts for important activity" enabled={toggles.smsAlerts} onToggle={() => toggleOption('smsAlerts')} />
                <div style={{ borderBottom: '1px solid #e8e8e8' }} />
                <ToggleSwitch label="Push Notifications" description="Receive push notifications in your browser" enabled={toggles.publicProfile} onToggle={() => toggleOption('publicProfile')} />
              </div>
            </motion.div>
          )}

          {/* BILLING SECTION */}
          {activeSection === 'billing' && (
            <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Current Plan</h2>
                <div className="flex items-center justify-between" style={{ padding: '20px', background: '#f0ecf9', borderRadius: '10px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 600, color: '#6C2BD9' }}>Free Plan</p>
                    <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Basic features for individual creators</p>
                  </div>
                  <motion.button whileTap={{ scale: 0.97 }} className="cursor-pointer border-none text-white"
                    style={{ padding: '10px 20px', background: '#6C2BD9', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
                    Upgrade
                  </motion.button>
                </div>
                <div style={{ borderBottom: '1px solid #e8e8e8', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>Usage This Month</h3>
                <div className="flex gap-6">
                  {[{ label: 'Campaigns', value: '2 / 5' }, { label: 'Storage', value: '120MB / 1GB' }, { label: 'API Calls', value: '450 / 1000' }].map((item) => (
                    <div key={item.label}>
                      <p style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Payment Method</h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>No payment method added yet.</p>
                <motion.button whileTap={{ scale: 0.97 }} className="cursor-pointer text-white border-none"
                  style={{ padding: '10px 20px', background: '#6C2BD9', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
                  Add Payment Method
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* HELP SECTION */}
          {activeSection === 'help' && (
            <motion.div key="help" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '16px' }}>Frequently Asked Questions</h2>
                {[
                  { q: 'How do I create a campaign?', a: 'Navigate to the Campaigns section from your dashboard and click "Create New Campaign". Follow the step-by-step wizard to set up your campaign goals, budget, and target audience.' },
                  { q: 'How do I connect with creators?', a: 'Browse the Creator Marketplace to find creators that match your niche. Send collaboration requests directly through the platform and manage all conversations in one place.' },
                  { q: 'What payment methods are accepted?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and PayPal. All payments are processed securely through our payment partner.' },
                  { q: 'How can I track campaign performance?', a: 'Visit the Analytics section to see real-time metrics for all your campaigns including reach, engagement, conversions, and ROI calculations.' },
                ].map((faq) => (
                  <details key={faq.q} style={{ borderBottom: '1px solid #e8e8e8', padding: '14px 0', cursor: 'pointer' }}>
                    <summary style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>{faq.q}</summary>
                    <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', lineHeight: 1.6 }}>{faq.a}</p>
                  </details>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '28px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Contact Support</h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>Need help? Our support team is available Monday to Friday, 9am to 6pm.</p>
                <div className="flex gap-3">
                  <motion.button whileTap={{ scale: 0.97 }} className="cursor-pointer text-white border-none"
                    style={{ padding: '10px 20px', background: '#6C2BD9', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
                    Email Support
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.97 }} className="cursor-pointer"
                    style={{ padding: '10px 20px', background: '#fff', border: '1px solid #6C2BD9', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#6C2BD9' }}>
                    Live Chat
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
