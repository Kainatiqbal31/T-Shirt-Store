import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart_items');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
    } catch (_) {}
  }, [cartItems]);

  const normalizePrice = (price) => {
    if (typeof price === 'number') return price;
    const parsed = parseFloat(String(price).replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const addToCart = (product, quantity = 1, color = "", size = "") => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.id === product.id &&
          item.color === color &&
          item.size === size
      );

      const priceNum = normalizePrice(product.price);

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].price = normalizePrice(updated[existingIndex].price);
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: priceNum,
            image: product.image,
            color,
            size,
            quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (id, color, size, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeItem = (id, color, size) => {
    setCartItems(prev =>
      prev.filter(
        item =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
