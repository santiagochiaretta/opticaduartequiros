import Item from "../Item/Item";

const ItemList = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </>
  );
};

export default ItemList;
