import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const TotalItems = () => {
  const { cart } = useContext(CartContext);

  const itemsQuanty = cart.reduce((acc, el) => acc + el.quantity, 0);

  return <span className="cart-number">{itemsQuanty}</span>;
};

export default TotalItems;
