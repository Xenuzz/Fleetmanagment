const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "web-frontend" });
});

// Redirect / to health check
app.get("/", (req, res) => {
  res.redirect("/health");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Web frontend server running on port ${PORT}`);
});
