import express from "express";
import apiRouter from "./routes/api.routes.js";
import { notFoundHandler, finalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

// 1. Logger de requisições no nível da aplicação
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 2. Middlewares embutidos de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Montagem do roteador modular de API
app.use("/api", apiRouter);

// 4. Middlewares de erro (sempre após as rotas, no final da pilha)
app.use(notFoundHandler);
app.use(finalErrorHandler);

// 5. Inicialização do servidor na porta 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

export default app;
