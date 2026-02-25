import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Observability
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Routes
app.use("/api", router);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🚀 SOHOZA API is running on port ${PORT}`);
  console.log(`----------------------------------------------`);
  console.log(`Health:   http://localhost:${PORT}/health`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`API Root: http://localhost:${PORT}/api`);
  console.log(`==============================================\n`);
});