import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('todo-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function Navbar() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('todo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="brand" href="/">
          <span className="brand-mark">T</span>
          <span className="brand-copy">
            <strong>TodoFlow</strong>
            <small>Focused task workspace</small>
          </span>
        </a>

        <div className="nav-actions">
          <a className="nav-link" href="/">
            Todos
          </a>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            <span className="theme-icon">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;