import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import TotalItems from "../TotalItems/TotalItems";
import "./NavBar.css";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  return (
    <header className="navbar-container">
      <Link to={"/"}>
        <img src="/img/optics-logo.png" alt="" className="navbar-logo" />
      </Link>

      <nav>
        <ul className="navbar-menu">
          <li>
            <Link to={"/category/lencontacto"}>Lentes de contacto</Link>
          </li>
          <li>
            <Link to={"/category/receta"}>Anteojos recetados</Link>
          </li>
          <li>
            <Link to={"/category/sol"}>Anteojos de sol</Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-cart">
        <Link to={"/cart"} className="cart-icon">
          <CartWidget />
        </Link>
        {cart.length > 0 ? <TotalItems /> : null}
      </div>
    </header>
  );
};

export default NavBar;
