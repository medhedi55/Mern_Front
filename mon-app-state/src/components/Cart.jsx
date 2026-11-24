import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, applyPromoCode, clearCart, removeItem } from '../redux/cartSlice.js';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const discountedTotal = totalPrice * (100 - discountPercent) / 100;

  function handlePromo(event) {
    event.preventDefault();
    dispatch(applyPromoCode(promoCode));
  }

  return (
    <section className="cart-card">
      <header className="cart-header">
        <h3>🛒 Mon Panier Redux</h3>
        {items.length > 0 && (
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>Vider</button>
        )}
      </header>
      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Le panier est actuellement vide.</p>
          <span className="empty-subtext">Ajoutez un article depuis le catalogue pour observer la réactivité de Redux.</span>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <span className="cart-item-icon" aria-hidden="true">{item.icon}</span>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{item.price} DT × {item.quantity}</span>
                </div>
                <div className="cart-item-qty">
                  <button className="btn-qty" aria-label={`Retirer une unité de ${item.name}`} onClick={() => dispatch(removeItem(item.id))}>-</button>
                  <span className="qty-number">{item.quantity}</span>
                  <button className="btn-qty" aria-label={`Ajouter une unité de ${item.name}`} onClick={() => dispatch(addItem(item))}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total-box">
            <p className="total-row">Nombre total d’articles : <strong>{totalCount}</strong></p>
            <p className="total-row total-highlight">Montant Total : <strong className="total-amount">{totalPrice} DT</strong></p>
            <form className="promo-form" onSubmit={handlePromo}>
              <label htmlFor="promo-code">Code promo</label>
              <div className="promo-controls">
                <input id="promo-code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} />
                <button className="btn-add" type="submit">Appliquer</button>
              </div>
            </form>
            {discountPercent > 0 && (
              <p className="total-row discounted-total">
                Montant remisé ({discountPercent} %) : <strong>{discountedTotal} DT</strong>
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
