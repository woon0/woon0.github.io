import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

const storageKey = 'portfolio-theme';
function savedPreference() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  } catch { return 'system'; }
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState(savedPreference);
  const [systemDark, setSystemDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  const dark = preference === 'system' ? systemDark : preference === 'dark';
  const next = preference === 'system' ? 'dark' : preference === 'dark' ? 'light' : 'system';

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = event => setSystemDark(event.matches);
    const sync = event => { if (event.key === storageKey || event.key === null) setPreference(savedPreference()); };
    media.addEventListener('change', update);
    window.addEventListener('storage', sync);
    return () => { media.removeEventListener('change', update); window.removeEventListener('storage', sync); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#19171e' : '#f5f3f0');
  }, [dark]);

  function changeTheme() {
    setPreference(next);
    try {
      if (next === 'system') localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, next);
    } catch { /* The toggle still works when browser storage is unavailable. */ }
  }

  const Icon = preference === 'system' ? Monitor : dark ? Moon : Sun;
  const label = `Theme: ${preference === 'system' ? `automatic (${dark ? 'dark' : 'light'})` : preference}. ${next === 'system' ? 'Follow system appearance' : `Switch to ${next} mode`}`;
  return <button className="theme-toggle" onClick={changeTheme} aria-label={label} title={label}>
    <Icon size={16} /><span>{preference === 'system' ? 'Auto' : dark ? 'Dark' : 'Light'}</span>
  </button>;
}

