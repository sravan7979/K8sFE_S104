import React, { useEffect, useState } from "react";
import { getProducts, getProductImageUrl } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ProductPage = ({ category }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(category || "");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Product added to cart successfully!");
    navigate("/cart");
  };

  return (
    <div className="product-container">
      <h2>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All Products"}
      </h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={getProductImageUrl(product.imagePath)}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
