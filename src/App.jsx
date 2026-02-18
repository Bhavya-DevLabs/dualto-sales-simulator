import { useState, useEffect } from 'react';
import SimulatorShell from './components/SimulatorShell';
import LoginScreen from './components/LoginScreen';

function loadUser() {
  try {
    const raw = localStorage.getItem('dualto_user');
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data — fall through
  }
  return null;
}

export default function App() {
  const [user, setUser] = useState(() => loadUser());

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    localStorage.removeItem('dualto_user');
    localStorage.removeItem('dualto_screen');
    window.location.reload();
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <SimulatorShell user={user} onSignOut={handleSignOut} />;
}
