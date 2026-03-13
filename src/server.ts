// src/server.ts
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be before all other imports

import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

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