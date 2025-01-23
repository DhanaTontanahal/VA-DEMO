const express = require("express");
const cors = require("cors");
const apiRoutes = require("./app/routes/apiRoutes");
const db = require("./config/dbConfig");

const app = express();
const port = 3006;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
