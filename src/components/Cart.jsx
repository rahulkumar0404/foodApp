import { useContext } from 'react';
import CartContext from '../store/CardContext';
import { currencyFormatter } from '../utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './Modal';
import Button from './UI/Button';
import CartItem from './CartItem';

export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);
  const cardCtx = useContext(CartContext);
  const cartTotal = cardCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cardCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cardCtx.addItem(item)}
            onDecrease={() => cardCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cardCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
