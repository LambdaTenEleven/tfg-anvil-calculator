import type { Theme } from '../../hooks/useTheme';
import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
    >
      <span>Night mode</span>
      <span className="theme-switch" aria-hidden="true">
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
}
