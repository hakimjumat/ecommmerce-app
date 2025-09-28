const express = require("express"); //importing express
const app = express(); // create an express app
const PORT = 3000;

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

// START THE SERVER
app.listen(PORT, () => {
  // start the server
  console.log(`Server is running on port ${PORT}`);
});
