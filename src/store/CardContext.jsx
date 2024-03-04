import { createContext, useReducer } from 'react';

const CardContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cardReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    //...update the state to add the meal item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    // ..remove the item from the state

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }
}
export function CardContextProvider({ children }) {
  const [cart, dispatchCardAction] = useReducer(cardReducer, { items: [] });

  const cardContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  // console.log(cardContext);
  function addItem(item) {
    dispatchCardAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCardAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCardAction({ type: 'CLEAR_CART' });
  }

  return (
    <CardContext.Provider value={cardContext}>{children}</CardContext.Provider>
  );
}

export default CardContext;
