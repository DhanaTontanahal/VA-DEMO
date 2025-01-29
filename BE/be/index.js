const express = require("express");
const app = express();
const port = 3005;

// Import routes
const apiRoutes = require("./app/routes/apiRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
