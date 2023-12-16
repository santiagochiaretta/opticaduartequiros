import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Acerca de Nosotros</h3>
          <p>
            Somos Optica Duarte Quirós. Ofrecemos una amplia gama de anteojos
            recetados y para sol, como así también lentes de contacto
            descartables.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <Link to={"*"}>Nosotros</Link>
            </li>{" "}
            <li>
              <Link to={"*"}>Ubicacion</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contacto</h3>
          <span>Dirección: Av. Duarte Quirós 98</span>
          <span>Email: optica.duartequiros@gmail.com</span>
          <span>Teléfono: 0351 - 157664770</span>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Optica Duarte Quirós | Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
