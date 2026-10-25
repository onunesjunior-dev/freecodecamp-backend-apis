import { Router } from "express";

const router = Router();

// Rota raiz da API
router.get("/", (req, res) => {
  res.send("API is available!");
});

// Rota que simula erro de infraestrutura (500 Internal Server Error)
router.get("/crash", (req, res, next) => {
  next(new Error("Database connection failed."));
});

// Rota que simula erro de validação do cliente (400 Bad Request)
router.get("/bad-request", (req, res, next) => {
  const err = new Error("Client-side data is missing.");
  err.status = 400;
  next(err);
});

export default router;
