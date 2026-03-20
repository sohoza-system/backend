import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import router from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet());
app.use(hpp());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api", limiter);

// Observability
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json({ limit: "10kb" })); // Body limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.use("/api", router);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// Final Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 SOHOZA API is running on port ${PORT}`);
  console.log(`----------------------------------------------`);
  console.log(`Health:   http://localhost:${PORT}/health`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`API Root: http://localhost:${PORT}/api`);
  console.log(`==============================================\n`);
});
