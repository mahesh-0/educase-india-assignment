import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import InputField from "../components/InputField";
import RadioButton from "../components/RadioButton";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import { useAuth } from "../context/AuthContext";
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validatePassword,
  validateCompanyName,
} from "../utils/validators";

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

const fieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [fields, setFields] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAgency, setIsAgency] = useState(true);
  const [authError, setAuthError] = useState("");

  const validations = {
    fullName: validateFullName(fields.fullName),
    phone: validatePhone(fields.phone),
    email: validateEmail(fields.email),
    password: validatePassword(fields.password),
    companyName: validateCompanyName(fields.companyName),
  };

  const isFormValid =
    validations.fullName.valid &&
    validations.phone.valid &&
    validations.email.valid &&
    validations.password.valid &&
    validations.companyName.valid;

  const updateField = (name: string, value: string) => {
    setFields((f) => ({ ...f, [name]: value }));
    setAuthError("");
  };

  const touchField = (name: string) => {
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSignup = () => {
    if (!isFormValid) {
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        password: true,
        companyName: true,
      });
      return;
    }
    const error = signup(
      {
        fullName: fields.fullName,
        email: fields.email,
        phone: fields.phone,
        companyName: fields.companyName,
        isAgency,
      },
      fields.password,
    );
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
      className="flex flex-col"
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
          marginBottom: "28px",
        }}
      >
        Create your
        <br />
        PopX account
      </h1>

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

      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.06 }}
      >
        <motion.div variants={fieldVariants}>
          <InputField
            label="Full Name*"
            placeholder="Marry Doe"
            type="text"
            value={fields.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            onBlur={() => touchField("fullName")}
            touched={touched.fullName}
            isValid={validations.fullName.valid}
            error={validations.fullName.message}
            required
          />
        </motion.div>
        <motion.div variants={fieldVariants}>
          <InputField
            label="Phone number*"
            placeholder="Marry Doe"
            type="tel"
            value={fields.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => touchField("phone")}
            touched={touched.phone}
            isValid={validations.phone.valid}
            error={validations.phone.message}
            required
          />
        </motion.div>
        <motion.div variants={fieldVariants}>
          <InputField
            label="Email address*"
            placeholder="Marry Doe"
            type="email"
            value={fields.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => touchField("email")}
            touched={touched.email}
            isValid={validations.email.valid}
            error={validations.email.message}
            required
          />
        </motion.div>
        <motion.div variants={fieldVariants}>
          <InputField
            label="Password *"
            placeholder="Marry Doe"
            type="password"
            value={fields.password}
            onChange={(e) => updateField("password", e.target.value)}
            onBlur={() => touchField("password")}
            touched={touched.password}
            isValid={validations.password.valid}
            error={validations.password.message}
            required
          />
        </motion.div>
      </motion.div>

      <PasswordStrengthBar
        strength={validations.password.strength}
        show={touched.password === true && fields.password.length > 0}
      />

      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.06, delayChildren: 0.24 }}
      >
        <motion.div variants={fieldVariants}>
          <InputField
            label="Company name"
            placeholder="Marry Doe"
            type="text"
            value={fields.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            onBlur={() => touchField("companyName")}
            touched={touched.companyName}
            isValid={validations.companyName.valid}
            error={validations.companyName.message}
          />
        </motion.div>
      </motion.div>

      <div style={{ marginTop: "4px", marginBottom: "12px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#111",
            marginBottom: "12px",
          }}
        >
          Are you an Agency?<span style={{ color: "#6C2BD9" }}>*</span>
        </p>
        <div className="flex items-center" style={{ gap: "24px" }}>
          <RadioButton
            label="Yes"
            selected={isAgency}
            onSelect={() => setIsAgency(true)}
          />
          <RadioButton
            label="No"
            selected={!isAgency}
            onSelect={() => setIsAgency(false)}
          />
        </div>
      </div>

      <div className="mt-auto" style={{ padding: "24px 0" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSignup}
          className="w-full cursor-pointer border-none text-white"
          style={{
            height: "52px",
            background: "#6C2BD9",
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          Create Account
        </motion.button>

        <p
          style={{
            fontSize: "13px",
            color: "#888",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="bg-transparent border-none cursor-pointer p-0"
            style={{ color: "#6C2BD9", fontWeight: 600, fontSize: "13px" }}
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
}
