import Cart from './components/Cart.jsx';
import Navbar from './components/Navbar.jsx';
import NotificationToast from './components/NotificationToast.jsx';
import ProductList from './components/ProductList.jsx';
import { useTheme } from './context/ThemeContext.jsx';

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <Navbar />
      <main className="container main-content">
        <header className="page-intro">
          <h1>État Global : <code>useContext</code> &amp; <code>Redux Toolkit</code></h1>
          <p>Séance 6 : Coexistence d'un état applicatif léger (Thème géré par Context) et d'un état métier transactionnel (Panier géré par Redux Toolkit).</p>
        </header>
        <div className="store-layout">
          <ProductList />
          <Cart />
        </div>
      </main>
      <NotificationToast />
    </div>
  );
}
