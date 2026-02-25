import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useWindowSize } from './hooks/useWindowSize';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DesktopWelcomePage from './pages/desktop/DesktopWelcomePage';
import DesktopLoginPage from './pages/desktop/DesktopLoginPage';
import DesktopSignUpPage from './pages/desktop/DesktopSignUpPage';
import DesktopAccountSettingsPage from './pages/desktop/DesktopAccountSettingsPage';

function MobileRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function DesktopRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DesktopWelcomePage />} />
        <Route path="/login" element={<DesktopLoginPage />} />
        <Route path="/signup" element={<DesktopSignUpPage />} />
        <Route path="/settings" element={<DesktopAccountSettingsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { isTablet } = useWindowSize();

  return isTablet ? <DesktopRoutes /> : <MobileRoutes />;
}
