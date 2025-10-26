const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const deviceRoutes = require("./routes/deviceRoutes");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ Render dynamically assigns a port. Use it or default to 10000.
const PORT = process.env.PORT || 10000;

// ✅ Bind to 0.0.0.0 so Render can reach the app.
const HOST = "0.0.0.0";

// ✅ Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ESSL Biometric Server for Trackyfy",
    version: "1.0.0",
    status: "running",
    endpoints: {
      devices: "/api/devices",
      users: "/api/users",
      attendance: "/api/attendance",
    },
  });
});

// ✅ Routes
app.use("/api/devices", deviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

// ✅ Error Handler
app.use(errorHandler);

// ✅ 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ✅ Start Express
app.listen(PORT, HOST, () => {
  console.log(`🚀 ESSL Biometric Server running on http://${HOST}:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
