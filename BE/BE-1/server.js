const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(accountRoutes);
app.use(transactionRoutes);
app.use(uploadRoutes);

app.get("/", (req, res) => res.json({ status: "Server is running 🚀" }));

app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
