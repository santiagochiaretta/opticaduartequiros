import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ name, price, id, img }) => {
  return (
    <article className="card-list">
      <img src={img} className="card-img" />
      <p className="card-name">{name}</p>
      <p className="card-price">$ {price}</p>
      <button className="btn">
        <Link to={`/item/${id}`}> Ver detalles </Link>
      </button>
    </article>
  );
};

export default Item;
