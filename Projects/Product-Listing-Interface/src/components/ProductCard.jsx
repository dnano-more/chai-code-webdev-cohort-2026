function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />

      <div className="card-body">
        <h3>{product.title}</h3>

        <p>{product.brand}</p>

        <p>{product.category}</p>

        <p>{product.description.slice(0, 70)}...</p>

        <h2>${product.price}</h2>

        <p>⭐ {product.rating}</p>

        <p>Stock : {product.stock}</p>

        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;