import axios from "axios";

// Single, correct base URL (no double slash)
const API_BASE_URL = "http://localhost:30083/back1/api/products";

// Fetch products by category (computers, mobiles, laptops, pendrives), or all when category is empty
export const getProducts = async (category = "") => {
  try {
    const url = category ? `${API_BASE_URL}/${category}` : API_BASE_URL;
    const response = await axios.get(url);
    return response.data; // Return products array
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
};

// Get product image URL
export const getProductImageUrl = (imagePath) => {
  return `${API_BASE_URL}/images/${imagePath}`;
};
