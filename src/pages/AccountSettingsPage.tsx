import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import InputField from "../components/InputField";
import ToggleSwitch from "../components/ToggleSwitch";
import { useAuth } from "../context/AuthContext";

type Section = "profile" | "security" | "notifications" | "billing" | "help";

const navItems: {
  label: string;
  key: Section;
  icon: string;
  icon2?: string;
  icon3?: string;
}[] = [
  {
    label: "Profile",
    key: "profile",
    icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2",
    icon2: "M12 3a4 4 0 100 8 4 4 0 000-8z",
  },
  {
    label: "Security",
    key: "security",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    label: "Notifications",
    key: "notifications",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9",
    icon2: "M13.73 21a2 2 0 01-3.46 0",
  },
  {
    label: "Billing",
    key: "billing",
    icon: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM1 10h22",
  },
  {
    label: "Help",
    key: "help",
    icon: "M12 22a10 10 0 100-20 10 10 0 000 20z",
    icon2: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3",
    icon3: "M12 17h.01",
  },
];

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function AccountSettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [formFields, setFormFields] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    companyName: user.companyName,
    website: "",
    location: "",
  });
  const [isAgency, setIsAgency] = useState(user.isAgency);
  const [toggles, setToggles] = useState({
    emailNotifications: true,
    smsAlerts: false,
    twoFactor: false,
    pushNotifications: true,
  });
  const [securityFields, setSecurityFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saved, setSaved] = useState(false);

  const updateField = (name: string, value: string) =>
    setFormFields((f) => ({ ...f, [name]: value }));
  const toggleOption = (key: keyof typeof toggles) =>
    setToggles((t) => ({ ...t, [key]: !t[key] }));

  const handleSave = () => {
    updateUser({
      fullName: formFields.fullName,
      email: formFields.email,
      phone: formFields.phone,
      companyName: formFields.companyName,
      isAgency,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const selectSection = (key: Section) => {
    setActiveSection(key);
    setMenuOpen(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: "100dvh", background: "#f7f8fa" }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e8e8e8",
          background: "#fff",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center cursor-pointer border-none bg-transparent p-1"
            style={{ width: "32px", height: "32px", gap: "5px" }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "#111",
                borderRadius: "1px",
              }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "#111",
                borderRadius: "1px",
              }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: "#111",
                borderRadius: "1px",
              }}
            />
          </button>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#6C2BD9",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            PopX
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span
              style={{ fontSize: "12px", color: "#22C55E", fontWeight: 500 }}
            >
              Saved!
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="cursor-pointer border-none text-white"
            style={{
              padding: "8px 16px",
              background: "#6C2BD9",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Save
          </motion.button>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 40,
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "280px",
                background: "#fff",
                zIndex: 50,
                padding: "24px 16px",
                boxShadow: "4px 0 24px rgba(0,0,0,0.1)",
              }}
            >
              {/* Menu Header */}
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: "24px", padding: "0 8px" }}
              >
                <motion.img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Profile"
                  className="rounded-full object-cover"
                  style={{ width: "44px", height: "44px" }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                />
                <div style={{ overflow: "hidden" }}>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#111",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.fullName}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <div
                style={{
                  borderBottom: "1px solid #e8e8e8",
                  marginBottom: "12px",
                }}
              />

              {/* Nav Items */}
              <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => selectSection(item.key)}
                    className="flex items-center gap-3 cursor-pointer border-none text-left"
                    style={{
                      padding: "14px 12px",
                      borderRadius: "10px",
                      background:
                        activeSection === item.key ? "#f0ecf9" : "transparent",
                      color: activeSection === item.key ? "#6C2BD9" : "#666",
                      fontSize: "15px",
                      fontWeight: 500,
                      transition: "all 0.2s",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={item.icon} />
                      {item.icon2 && <path d={item.icon2} />}
                      {item.icon3 && <path d={item.icon3} />}
                    </svg>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div
                style={{ borderTop: "1px solid #e8e8e8", paddingTop: "12px" }}
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer border-none text-left w-full"
                  style={{
                    padding: "14px 12px",
                    borderRadius: "10px",
                    background: "transparent",
                    color: "#EF4444",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Section Title */}
      <div style={{ padding: "20px 20px 8px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontWeight: 600,
          }}
        >
          {navItems.find((n) => n.key === activeSection)?.label}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 24px" }}>
        {/* PROFILE */}
        {activeSection === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <motion.img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Profile"
                    className="rounded-full object-cover"
                    style={{
                      width: "64px",
                      height: "64px",
                      outline: "3px solid #6C2BD9",
                      outlineOffset: "2px",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  />
                  <div
                    className="absolute flex items-center justify-center rounded-full"
                    style={{
                      width: "24px",
                      height: "24px",
                      background: "#6C2BD9",
                      bottom: "0",
                      right: "0",
                      border: "2px solid #fff",
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
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p
                    style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}
                  >
                    {user.fullName}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#888",
                      marginTop: "2px",
                    }}
                  >
                    {user.email}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#6C2BD9",
                      marginTop: "2px",
                      fontWeight: 500,
                    }}
                  >
                    {user.isAgency ? "Agency" : "Creator"}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <InputField
                label="Full Name"
                placeholder="Jane Doe"
                value={formFields.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
              <InputField
                label="Email Address"
                placeholder="you@example.com"
                type="email"
                value={formFields.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <InputField
                label="Phone Number"
                placeholder="1234567890"
                type="tel"
                value={formFields.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <InputField
                label="Company Name"
                placeholder="Your company"
                value={formFields.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
              />
              <InputField
                label="Website URL"
                placeholder="https://yoursite.com"
                value={formFields.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
              <InputField
                label="Location"
                placeholder="City, Country"
                value={formFields.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Account Type
              </p>
              <div className="flex gap-3">
                {(["Agency", "Creator"] as const).map((option) => {
                  const selected = option === "Agency" ? isAgency : !isAgency;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsAgency(option === "Agency")}
                      className="cursor-pointer flex-1"
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: `1px solid ${selected ? "#6C2BD9" : "#e0e0e0"}`,
                        background: selected ? "#f0ecf9" : "#fff",
                        color: selected ? "#6C2BD9" : "#888",
                        fontSize: "14px",
                        fontWeight: 500,
                        transition: "all 0.2s",
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* SECURITY */}
        {activeSection === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "16px",
                }}
              >
                Change Password
              </h2>
              <InputField
                label="Current Password"
                placeholder="Enter current password"
                type="password"
                value={securityFields.currentPassword}
                onChange={(e) =>
                  setSecurityFields((s) => ({
                    ...s,
                    currentPassword: e.target.value,
                  }))
                }
              />
              <InputField
                label="New Password"
                placeholder="Enter new password"
                type="password"
                value={securityFields.newPassword}
                onChange={(e) =>
                  setSecurityFields((s) => ({
                    ...s,
                    newPassword: e.target.value,
                  }))
                }
              />
              <InputField
                label="Confirm New Password"
                placeholder="Confirm new password"
                type="password"
                value={securityFields.confirmPassword}
                onChange={(e) =>
                  setSecurityFields((s) => ({
                    ...s,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full cursor-pointer border-none text-white"
                style={{
                  padding: "12px",
                  background: "#6C2BD9",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Update Password
              </motion.button>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "8px",
                }}
              >
                Two-Factor Authentication
              </h2>
              <ToggleSwitch
                label="Enable 2FA"
                description="Add an extra layer of security using an authenticator app"
                enabled={toggles.twoFactor}
                onToggle={() => toggleOption("twoFactor")}
              />
              <div style={{ borderBottom: "1px solid #e8e8e8" }} />
              <div style={{ paddingTop: "12px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#111",
                    marginBottom: "8px",
                  }}
                >
                  Active Sessions
                </p>
                <div
                  className="flex items-center justify-between"
                  style={{ padding: "10px 0" }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#111",
                        fontWeight: 500,
                      }}
                    >
                      Current Browser
                    </p>
                    <p style={{ fontSize: "12px", color: "#888" }}>
                      Last active: Now
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#22C55E",
                      fontWeight: 500,
                      background: "#DCFCE7",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* NOTIFICATIONS */}
        {activeSection === "notifications" && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "4px",
                }}
              >
                Notification Preferences
              </h2>
              <p
                style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}
              >
                Choose how you want to be notified.
              </p>
              <ToggleSwitch
                label="Email Notifications"
                description="Receive updates about campaigns and messages"
                enabled={toggles.emailNotifications}
                onToggle={() => toggleOption("emailNotifications")}
              />
              <div style={{ borderBottom: "1px solid #e8e8e8" }} />
              <ToggleSwitch
                label="SMS Alerts"
                description="Get instant alerts for important activity"
                enabled={toggles.smsAlerts}
                onToggle={() => toggleOption("smsAlerts")}
              />
              <div style={{ borderBottom: "1px solid #e8e8e8" }} />
              <ToggleSwitch
                label="Push Notifications"
                description="Receive push notifications in your browser"
                enabled={toggles.pushNotifications}
                onToggle={() => toggleOption("pushNotifications")}
              />
            </div>
          </motion.div>
        )}

        {/* BILLING */}
        {activeSection === "billing" && (
          <motion.div
            key="billing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Current Plan
              </h2>
              <div
                style={{
                  padding: "16px",
                  background: "#f0ecf9",
                  borderRadius: "10px",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#6C2BD9",
                  }}
                >
                  Free Plan
                </p>
                <p
                  style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}
                >
                  Basic features for individual creators
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer border-none text-white"
                  style={{
                    marginTop: "12px",
                    padding: "10px 20px",
                    background: "#6C2BD9",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Upgrade
                </motion.button>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #e8e8e8",
                  marginBottom: "16px",
                }}
              />
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Usage This Month
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Campaigns", value: "2 / 5" },
                  { label: "Storage", value: "120MB / 1GB" },
                  { label: "API Calls", value: "450 / 1000" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                    style={{ padding: "8px 0" }}
                  >
                    <p style={{ fontSize: "13px", color: "#888" }}>
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#111",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "8px",
                }}
              >
                Payment Method
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#888",
                  marginBottom: "16px",
                }}
              >
                No payment method added yet.
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full cursor-pointer text-white border-none"
                style={{
                  padding: "12px",
                  background: "#6C2BD9",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Add Payment Method
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* HELP */}
        {activeSection === "help" && (
          <motion.div
            key="help"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                FAQ
              </h2>
              {[
                {
                  q: "How do I create a campaign?",
                  a: 'Navigate to the Campaigns section from your dashboard and click "Create New Campaign". Follow the step-by-step wizard to set up your campaign goals, budget, and target audience.',
                },
                {
                  q: "How do I connect with creators?",
                  a: "Browse the Creator Marketplace to find creators that match your niche. Send collaboration requests directly through the platform.",
                },
                {
                  q: "What payment methods are accepted?",
                  a: "We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and PayPal. All payments are processed securely.",
                },
                {
                  q: "How can I track performance?",
                  a: "Visit the Analytics section to see real-time metrics for all your campaigns including reach, engagement, conversions, and ROI.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  style={{
                    borderBottom: "1px solid #e8e8e8",
                    padding: "12px 0",
                    cursor: "pointer",
                  }}
                >
                  <summary
                    style={{ fontSize: "14px", fontWeight: 500, color: "#111" }}
                  >
                    {faq.q}
                  </summary>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      marginTop: "8px",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "8px",
                }}
              >
                Contact Support
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#888",
                  marginBottom: "16px",
                }}
              >
                Our team is available Mon-Fri, 9am-6pm.
              </p>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full cursor-pointer text-white border-none"
                  style={{
                    padding: "12px",
                    background: "#6C2BD9",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Email Support
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full cursor-pointer"
                  style={{
                    padding: "12px",
                    background: "#fff",
                    border: "1px solid #6C2BD9",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#6C2BD9",
                  }}
                >
                  Live Chat
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
