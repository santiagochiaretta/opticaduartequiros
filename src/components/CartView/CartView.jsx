import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartView.css";

const CartView = () => {
  const { cart, total, clearCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-view-container">
      <h1>Carrito de compras</h1>
      {cart.length > 0 ? (
        <div className="cart-view-items">
          {cart.map((prod) => (
            <div key={prod.product.id} className="cart-product">
              <img src={prod.product.img} alt={prod.product.name} />
              <p className="cart-name">{prod.product.name}</p>
              <p className="cart-quantity">Cantidad: {prod.quantity}</p>
              <p className="cart-price">$ {prod.quantity * prod.product.price}</p>
              <span onClick={() => {removeFromCart(prod.product.id);}} className="delete-product">❌</span>
            </div>
          ))}
          <h2>Total de la compra: ${total}</h2>
          <button
            onClick={() => {
              clearCart();
            }}
            className="cart-btn-empty"
          >
            Vaciar
          </button>
          <button className="cart-btn">
            <Link to="/Checkout">Continuar</Link>
          </button>
        </div>
      ) : (
        <div className="cart-view-empty">
          <h2>No hay productos en tu carrito aún.</h2>
          <button className="btn">
            <Link to="/">Volver</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
