import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 hover:scale-105 transition"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;
