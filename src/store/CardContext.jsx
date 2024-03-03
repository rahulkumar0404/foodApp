import { createContext, useReducer } from 'react';

const CardContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
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
}
export function CardContextProvider({ children }) {
  const [cart, dispatchCardAction] = useReducer(cardReducer, { items: [] });

  const CardContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  function addItem(item) {
    dispatchCardAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCardAction({ type: 'REMOVE_ITEM', id });
  }

  return (
    <CardContext.Provider value={CardContext.value}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
