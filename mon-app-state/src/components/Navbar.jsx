import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon" aria-hidden="true">⚡</span>
        <h2>TechStore <span className="badge-mern">MERN S6</span></h2>
      </div>
      <div className="nav-actions">
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </button>
        <div className="cart-badge">
          <span className="cart-icon" aria-hidden="true">🛒</span>
          <span className="badge-count" aria-label="Articles dans le panier">{totalCount}</span>
        </div>
      </div>
    </nav>
  );
}
