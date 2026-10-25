import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import weatherRouter from "./weather.js";

// Reconstrução de __dirname em ambiente ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 1. Serviço de arquivos estáticos (HTML, CSS, JS do front-end)
app.use(express.static(path.join(__dirname, "public")));

// 2. Rota raiz que serve o formulário/dashboard meteorológico
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 3. Documentação autodescritiva da API
app.get("/api/info", (req, res) => {
  res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]
  });
});

// 4. Health check do servidor
app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

// 5. Redirecionamento de documentação
app.get("/docs", (req, res) => {
  res.redirect("/api/info");
});

// 6. Rota com parâmetro dinâmico
app.get("/api/greet/:name", (req, res) => {
  res.json({
    message: `Hello, ${req.params.name}!`
  });
});

// 7. Manipulador encadeado (GET e POST no mesmo endpoint)
app.route("/api/data")
  .get((req, res) => {
    res.json({
      data: "Weather data available"
    });
  })
  .post((req, res) => {
    res.status(201).json({
      message: "Data created"
    });
  });

// 8. Montagem do roteador modular de clima no prefixo /api/weather
app.use("/api/weather", weatherRouter);

// 9. Inicialização do servidor HTTP
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
