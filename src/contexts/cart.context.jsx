import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //If found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems/ new cart Item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cartItem to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //Check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //if quantity is not 1 return back cartItems with matching cartItem with reduced quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, cartItemToClear) => {
  //return back cartItems with matching cartItem with reduced quantity
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const clearAllFromCart = (cartItems) => {
  return [];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

/*
CartItem
{
id,
name,
price,
imageUrl,
quantity
}

*/

export const USER_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  // const payload = {
  //   cartItems,
  //   cartCount,
  //   cartTotal,
  // };

  switch (type) {
    case USER_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case USER_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, cartCount, cartTotal } = state;

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    /*
    generate newCartTotal from newCartItems

    generate newCartCount from newCartItems

    dispatch new action with payload ={
    newCartItems,
    newCartTotal,
    newCartCount  
    }
    */

    dispatch(
      createAction(USER_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems);
  };

  const clearCart = () => {
    const newCartItems = clearAllFromCart(cartItems);
    updateCartItemReducer(newCartItems);
    //console.log(cartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    clearCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
