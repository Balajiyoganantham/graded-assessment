// Graded Assessment: Working with JSON Data

// Problem:

// You are tasked with implementing a product management system. The system will use JSON data for storing information about products. Each product has the following properties:

// · id: Unique identifier for the product.

// · name: Name of the product.

// · category: Category of the product.

// · price: Price of the product.

// · available: Boolean indicating if the product is in stock.

// The tasks below involve reading JSON data, adding new products, updating product information, and filtering products based on certain conditions.


// Tasks:

// 1. Parse the JSON data:

// Write a function that reads the JSON data (in the format above) and converts it into a usable data structure. You will need to parse the JSON into a JavaScript object.

// 2. Add a new product:

// Write a function to add a new product to the catalog. This product will have the same structure as the others and should be appended to the products array.

// 3. Update the price of a product:

// Write a function that takes a product ID and a new price and updates the price of the product with the given ID. If the product doesn’t exist, the function should return an error message.

// 4. Filter products based on availability:

// Write a function that returns only the products that are available (i.e., available: true).

// 5. Filter products by category:

// Write a function that takes a category name (e.g., "Electronics") and returns all products in that category.
// Sample JSON data for products
const productsJSON = `[
    {"id": 1, "name": "Laptop", "category": "Electronics", "price": 1200, "available": true},
    {"id": 2, "name": "Smartphone", "category": "Electronics", "price": 800, "available": false},
    {"id": 3, "name": "Desk Chair", "category": "Furniture", "price": 150, "available": true}
  ]`;
  
  // Task 1: Parse the JSON data
  function parseProductsData(jsonData) {
    try {
      const products = JSON.parse(jsonData);
      return products;
    } catch (error) {
      console.error("Invalid JSON data", error);
      return [];
    }
  }
  
  // Parse the products
  let products = parseProductsData(productsJSON);
  
  // Task 2: Add a new product
  function addProduct(product) {
    if (!product.id || !product.name || !product.category || product.price === undefined || product.available === undefined) {
      console.error("Invalid product structure");
      return;
    }
    products.push(product);
  }
  
  // Task 3: Update the price of a product by ID
  function updateProductPrice(productId, newPrice) {
    const product = products.find(p => p.id === productId);
    if (product) {
      product.price = newPrice;
    } else {
      console.error("Product not found");
    }
  }
  
  // Task 4: Filter products based on availability
  function getAvailableProducts() {
    return products.filter(product => product.available);
  }
  
  // Task 5: Filter products by category
  function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
  }
  
  // Example usage:
  
  // Adding a new product
  addProduct({ id: 4, name: "Tablet", category: "Electronics", price: 300, available: true });
  console.log("Products after adding a new one:", products);
  
  // Updating product price
  updateProductPrice(2, 850);
  console.log("Products after price update:", products);
  
  // Filtering products by availability
  console.log("Available products:", getAvailableProducts());
  
  // Filtering products by category
  console.log("Electronics products:", getProductsByCategory("Electronics"));
  