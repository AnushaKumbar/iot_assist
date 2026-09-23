import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('iot_theme') || 'light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('iot_settings') || '{}');
    } catch { return {}; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('iot_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('iot_settings', JSON.stringify(settings));
  }, [settings]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const updateSettings = (patch) => setSettings((s) => ({ ...s, ...patch }));

  return (
    <AppContext.Provider value={{ theme, toggleTheme, sidebarOpen, setSidebarOpen, settings, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
