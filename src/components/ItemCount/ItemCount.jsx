import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ initial, stock, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > initial) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    onAdd(count);
  };

  return (
    <div className="counter-container">
      <p>Stock: {stock}</p>
      <div className="counter">
        <button
          onClick={decrement}
          disabled={count === initial}
          className="counter-btn"
        >
          -
        </button>

        <span>{count}</span>

        <button onClick={increment} disabled={count === stock} className="counter-btn">
          +
        </button>
      </div>
      <button onClick={addToCart} className="btn">
        Agregar
      </button>
    </div>
  );
};

export default ItemCount;
