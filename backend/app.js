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
  {
    id: 4,
    name: "Product D",
    price: 99.99,
    description: "Description for Product D",
    image: "https://via.placeholder.com/300x300.png?text=Product+D",
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
//Products API endpoint with pagination
app.get("/api/products", (req, res) => {
  // return the list of products
  console.log("Products endpoint was hit");

  // Get page and limit from URL parameters, default to page 1 and limit to 2 items per page
  const page = parseInt(req.query.page) || 1;
  // If someone visits: /api/products?page=2
  // req.query.page = "2"
  // parseInt("2") = 2
  const limit = parseInt(req.query.limit) || 2;

  // Calculate start and end index
  const startIndex = (page - 1) * limit;
  // Page 1: (1-1) * 2 = 0 (start at product 0)
  // Page 2: (2-1) * 2 = 2 (start at product 2)
  const endIndex = page * limit;

  const paginatedProducts = products.slice(startIndex, endIndex);
  // Page 1: products.slice(0, 2) = first 2 products
  // Page 2: products.slice(2, 4) = next 2 products

  console.log(
    `Showing page ${page}, products ${startIndex + 1}-${Math.min(
      endIndex,
      products.length
    )}`
  );

  res.json({
    message: "Products loaded successfully",
    data: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalProducts: products.length,
      productsPerPage: limit,
    },
  });
});

// START THE SERVER
app.listen(PORT, () => {
  // start the server
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test it: \nhttp://localhost:${PORT}/api/test
    \nProducts:
    http://localhost:${PORT}/api/products?page=1&limit=2
    http://localhost:${PORT}/api/products?page=2&limit=2`);
});
