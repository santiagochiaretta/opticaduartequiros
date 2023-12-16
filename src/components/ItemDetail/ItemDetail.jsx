import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ product }) => {
  const [quantities, setQuantities] = useState(0);

  const { addToCart } = useContext(CartContext);

  const onAdd = (quantity) => {
    setQuantities(quantity);
    addToCart(product, quantity);
  };

  return (
    <article className="card-list">
      <img src={product.img} className="card-img" key={product.id} />
      <h2 className="card-name">{product.name}</h2>
      <p className="card-description">{product.description}</p>
      <p className="card-price">$ {product.price}</p>
      {quantities === 0 ? (
        <ItemCount initial={1} stock={product.stock} onAdd={onAdd} />
      ) : (
        <button className="btn">
          <Link to={"/cart"}>Ver carrito</Link>
        </button>
      )}
    </article>
  );
};

export default ItemDetail;
