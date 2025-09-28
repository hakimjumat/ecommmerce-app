const express = require("express"); //importing express
const app = express(); // create an express app
const PORT = 3000;

// MOCK product data - in real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Product A",
    price: 29.99,
    description: "Description for Product A",
    image: "https://via.placeholder.com/300x300.png?text=Product+A",
  },
  {
    id: 2,
    name: "Product B",
    price: 49.99,
    description: "Description for Product B",
    image: "https://via.placeholder.com/300x300.png?text=Product+B",
  },
  {
    id: 3,
    name: "Product C",
    price: 19.99,
    description: "Description for Product C",
    image: "https://via.placeholder.com/300x300.png?text=Product+C",
  },
];

// ROUTES
app.get("/", (req, res) => {
  //when someone visits the root route
  res.json({
    message: "Testing root api! Server is running.",
    time: new Date(),
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "This is a test endpoint",
    status: "success",
  });
});
//Products API endpoint
app.get("/api/products", (req, res) => {
  // return the list of products
  console.log("Products endpoint was hit");
  res.json({
    message: "Products fetched successfully",
    count: products.length,
    products: products,
  });
});

// START THE SERVER
app.listen(PORT, () => {
  // start the server
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/api/test`);
});
