const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Static files
app.use("/files", express.static(path.join(__dirname, "uploads")));

// Test Routes

// File routes
app.use("/api", fileRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    requestedUrl: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`- GET /api/home`);
  console.log(`- POST /api/upload`);
  console.log(`- GET /files/:filename`);
});
