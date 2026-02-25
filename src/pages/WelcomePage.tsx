import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col justify-end"
      style={{ minHeight: "100dvh", background: "#f7f8fa" }}
    >
      <div style={{ padding: "0 24px 40px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111",
            marginBottom: "12px",
          }}
        >
          Welcome to PopX
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#888",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit,
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/signup")}
          className="w-full cursor-pointer border-none text-white"
          style={{
            height: "52px",
            background: "#6C2BD9",
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.1 },
          }}
        >
          Create Account
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/login")}
          className="w-full cursor-pointer border-none"
          style={{
            height: "52px",
            background: "#D6C9F0",
            color: "#6C2BD9",
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "8px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.2 },
          }}
        >
          Already Registered? Login
        </motion.button>
      </div>
    </motion.div>
  );
}
