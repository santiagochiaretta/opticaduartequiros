import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const savedTotal = JSON.parse(localStorage.getItem("total")) || 0;
  const [cart, setCart] = useState(savedCart);
  const [total, setTotal] = useState(savedTotal);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("total", total);
  }, [total]);

  const addToCart = (product, quantity) => {
    const repeatedProduct = cart.find((item) => item.product.id === product.id);

    if (!repeatedProduct) {
      setCart((prev) => [...prev, { product, quantity }]);
      setTotalItems((prev) => prev + quantity);
      setTotal((prev) => prev + product.price * quantity);
    } else {
      const newCart = cart.map((prod) => {
        if (prod.product.id === product.id) {
          return { ...prod, quantity: prod.quantity + quantity };
        } else {
          return prod;
        }
      });

      setCart(newCart);
      setTotalItems((prev) => prev + quantity);
      setTotal((prev) => prev + product.price * quantity);
    }
  };

  const removeFromCart = (id) => {
    const removedProduct = cart.find((element) => element.product.id === id);

    const newCart = cart.filter(
      (element) => element.product.id !== removedProduct.product.id
    );

    setCart(newCart);
    setTotalItems((prev) => prev - removedProduct.quantity);
    setTotal(
      (prev) => prev - removedProduct.product.price * removedProduct.quantity
    );
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setTotalItems(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
