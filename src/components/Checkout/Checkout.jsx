import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const { cart, total, clearCart } = useContext(CartContext);

  const formController = (event) => {
    event.preventDefault();
    if (!name || !lastName || !phone || !email || !emailConfirmation) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (email !== emailConfirmation) {
      setError("Los emails no coinciden.");
      return;
    }
    const db = getFirestore();

    const order = {
      items: cart.map((prod) => ({
        id: prod.product.id,
        name: prod.product.name,
        quantity: prod.quantity,
      })),
      date: new Date(),
      total: total,
      name,
      lastName,
      phone,
      email,
    };

    Promise.all(
      order.items.map(async (productsOrder) => {
        const productRef = doc(db, "productos", productsOrder.id);
        const productDoc = await getDoc(productRef);
        const currentStock = productDoc.data().stock;
        const newStock = currentStock - productsOrder.quantity;
        await updateDoc(productRef, { stock: newStock });
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), order)
          .then((docRef) => {
            setOrderId(docRef.id);
            clearCart();
          })
          .catch(() => {
            setError("Error al generar la orden");
          });
      })
      .catch(() => {
        setError("Error al actualizar el stock");
      });
  };

  return (
    <div>
      <div className="checkout-container">
        <h2 className="checkout-title">Ingresa tus datos</h2>
        {cart.map((prod) => (
          <div key={prod.product.id} className="checkout-items">
            <p>
              {" "}
              {prod.product.name} x {prod.quantity}{" "}
            </p>
            <p>$ {prod.product.price}</p>
            <hr />
          </div>
        ))}
      </div>
      <form onSubmit={formController} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Nombre"
            onChange={(event) => setName(event.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            placeholder="Apellido"
            onChange={(event) => setLastName(event.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="number"
            id="phone"
            placeholder="Teléfono"
            onChange={(event) => setPhone(event.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailConfirmation">Confirmar Email</label>
          <input
            type="text"
            id="emailConfirmation"
            placeholder="Confirmar Email"
            onChange={(event) => setEmailConfirmation(event.target.value)}
            maxLength="50"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <button type="submit" className="check-btn">
            Enviar
          </button>
        </div>
        {orderId && (
          <strong className="alert alert-success">
            ¡Gracias por tu compra! Tu n° de orden es: {orderId}{" "}
          </strong>
        )}
      </form>
    </div>
  );
};

export default Checkout;
