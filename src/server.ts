// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be before all other imports

import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index";

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

app.use("/api", router);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 SOHOZA API is running on port ${PORT}`);
  console.log(`----------------------------------------------`);
  console.log(`Health:   http://localhost:${PORT}/health`);
  console.log(`API Root: http://localhost:${PORT}/api`);
  console.log(`==============================================\n`);
});