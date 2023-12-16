import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const newDoc = doc(db, "productos", itemId);
    getDoc(newDoc)
      .then((res) => {
        const data = res.data();
        const newProduct = { id: res.id, ...data };
        setProduct(newProduct);
      })
      .catch((error) => console.log(error));
  }, [itemId]);

  return (
    <section className="item-detail-container">
      <h1>Detalle del producto</h1>
      <div className="item-detail-product">
        {product ? <ItemDetail product={product} /> : <div className="spinner"></div>}
      </div>
    </section>
  );
};

export default ItemDetailContainer;
