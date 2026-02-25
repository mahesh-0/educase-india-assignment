import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validateLoginPassword } from "../utils/validators";

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [authError, setAuthError] = useState("");

  const emailResult = validateEmail(email);
  const passwordResult = validateLoginPassword(password);
  const isFormValid = emailResult.valid && passwordResult.valid;

  const handleLogin = () => {
    if (!isFormValid) {
      setTouched({ email: true, password: true });
      return;
    }
    setAuthError("");
    const error = login(email, password);
    if (error) {
      setAuthError(error);
      return;
    }
    navigate("/settings");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        minHeight: "100dvh",
        background: "#f7f8fa",
        padding: "40px 24px 24px",
      }}
    >
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#111",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}
      >
        Signin to your
        <br />
        PopX account
      </h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>
        Lorem ipsum dolor sit amet,
        <br />
        consectetur adipiscing elit,
      </p>

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              background: "#FEE2E2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "20px",
              fontSize: "13px",
              color: "#DC2626",
            }}
          >
            {authError}
          </motion.div>
        )}
      </AnimatePresence>

      <InputField
        label="Email Address"
        placeholder="Enter email address"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setAuthError("");
        }}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        touched={touched.email}
        isValid={emailResult.valid}
        error={emailResult.message}
      />
      <div style={{ marginBottom: "8px" }} />
      <InputField
        label="Password"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setAuthError("");
        }}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        touched={touched.password}
        isValid={passwordResult.valid}
        error={passwordResult.message}
      />

      <div style={{ marginTop: "8px" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          className="w-full cursor-pointer border-none text-white"
          style={{
            height: "52px",
            background: isFormValid ? "#6C2BD9" : "#C4C4C4",
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "8px",
            transition: "background 0.2s",
          }}
        >
          Login
        </motion.button>
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "#888",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="bg-transparent border-none cursor-pointer p-0"
          style={{ color: "#6C2BD9", fontWeight: 600, fontSize: "13px" }}
        >
          Create one
        </button>
      </p>
    </motion.div>
  );
}
