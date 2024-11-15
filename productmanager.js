// assessment1

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
const readline = require('readline');


const productsJSON = `[
  {"id": 1, "name": "Laptop", "category": "Electronics", "price": 1200, "available": true},
  {"id": 2, "name": "Smartphone", "category": "Electronics", "price": 800, "available": false},
  {"id": 3, "name": "Desk Chair", "category": "Furniture", "price": 150, "available": true}
]`;

function parseProductsData(jsonData) {
  try {
    const products = JSON.parse(jsonData);
    return products;
  } catch (error) {
    console.error("Invalid JSON data", error);
    return [];
  }
}
let products = parseProductsData(productsJSON);
function addProduct(product) {
  if (!product.id || !product.name || !product.category || product.price === undefined || product.available === undefined) {
    console.error("Invalid product structure");
    return;
  }
  products.push(product);
}
function updateProductPrice(productId, newPrice) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.price = newPrice;
  } else {
    console.error("Product not found");
  }
}
function getAvailableProducts() {
  return products.filter(product => product.available);
}

function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function showMenu() {
  console.log(
    "Choose an option:\n" +
    "1. View all products\n" +
    "2. Add a new product\n" +
    "3. Update product price\n" +
    "4. Filter products by availability\n" +
    "5. Filter products by category\n" +
    "6. Exit"
  );

  const choice = await askQuestion("Enter your choice: ");

  switch (choice) {
    case "1":
      console.log("All products:", products);
      break;
    case "2":
      const id = parseInt(await askQuestion("Enter product ID: "));
      const name = await askQuestion("Enter product name: ");
      const category = await askQuestion("Enter product category: ");
      const price = parseFloat(await askQuestion("Enter product price: "));
      const available = (await askQuestion("Is the product available? (yes/no): ")) === "yes";
      addProduct({ id, name, category, price, available });
      console.log("Product added:", products);
      break;
    case "3":
      const productId = parseInt(await askQuestion("Enter product ID to update: "));
      const newPrice = parseFloat(await askQuestion("Enter the new price: "));
      updateProductPrice(productId, newPrice);
      console.log("Updated products:", products);
      break;
    case "4":
      console.log("Available products:", getAvailableProducts());
      break;
    case "5":
      const filterCategory = await askQuestion("Enter category to filter by: ");
      console.log("Products in category:", getProductsByCategory(filterCategory));
      break;
    case "6":
      console.log("Exiting...");
      rl.close();
      return;
    default:
      console.error("Invalid choice. Please try again.");
  }

  showMenu();
}

showMenu();
