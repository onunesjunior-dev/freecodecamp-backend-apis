import express from "express";
import { getAccounts, saveAccounts } from "./db.js";

const app = express();
const PORT = 9000;

// Middlewares essenciais de parsing e formatação
app.use(express.json());
app.set("json spaces", 2);

// 1. Rota Raiz Informativa
app.get("/", (req, res) => {
  res.send("Tiny Bank API (Express 5) running...");
});

// 2. Health Check e Observabilidade para Balanceadores de Carga
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage(),
  });
});

// 3. Consulta de Todas as Contas (Padrão Moderno Express 5 sem try/catch)
app.get("/accounts", async (req, res) => {
  const accounts = await getAccounts();
  res.json(accounts);
});

// 4. Consulta de Conta por ID com Tratamento de Não Encontrado (404)
app.get("/accounts/:id", async (req, res) => {
  const accounts = await getAccounts();
  const account = accounts.find((a) => a.id === parseInt(req.params.id));

  if (!account) {
    const err = new Error("Account not found");
    err.status = 404;
    throw err;
  }

  res.json(account);
});

// 5. Transferência de Fundos com Validação Defensiva em 5 Camadas
app.post("/transfer", async (req, res) => {
  const { fromId, toId, amount } = req.body;

  // Barreira 1: Validação de presença de campos
  if (!fromId || !toId || !amount) {
    const err = new Error("Missing required fields: fromId, toId, amount");
    err.status = 400;
    throw err;
  }

  // Barreira 2: Validação de valor estritamente positivo
  if (amount <= 0) {
    const err = new Error("Transfer amount must be positive");
    err.status = 400;
    throw err;
  }

  const accounts = await getAccounts();

  // Barreira 3: Existência da conta emissora
  const sender = accounts.find((a) => a.id === fromId);
  if (!sender) {
    const err = new Error("Sender account not found");
    err.status = 404;
    throw err;
  }

  // Barreira 4: Existência da conta recebedora
  const recipient = accounts.find((a) => a.id === toId);
  if (!recipient) {
    const err = new Error("Recipient account not found");
    err.status = 404;
    throw err;
  }

  // Barreira 5: Suficiência de saldo (Conflito de estado do recurso)
  if (sender.balance < amount) {
    const err = new Error("Insufficient funds");
    err.status = 409;
    throw err;
  }

  // Execução da transação e persistência atômica
  sender.balance -= amount;
  recipient.balance += amount;

  await saveAccounts(accounts);

  // Recibo JSON emitido ao cliente
  res.json({
    message: "Transfer successful",
    senderName: sender.owner,
    recipientName: recipient.owner,
    amountTransferred: amount,
    senderNewBalance: sender.balance,
    recipientNewBalance: recipient.balance,
  });
});

// 6. Middleware Centralizado de Tratamento de Erros (4 Parâmetros Obrigatórios)
app.use((err, req, res, next) => {
  // Observabilidade no servidor (não expõe stack traces a clientes externos)
  console.error("Error:", err.message);

  // Resposta previsível e estruturada com fallback HTTP 500
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

// 7. Inicialização do Servidor HTTP e Armazenamento do Handle
const server = app.listen(PORT, () => {
  console.log(`Tiny Bank API running on http://localhost:${PORT}...`);
});

// 8. Graceful Shutdown para Orquestradores de Nuvem (Kubernetes/Docker)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

// 9. Graceful Shutdown para Interrupção Manual no Terminal (Ctrl + C)
process.on("SIGINT", () => {
  console.log("SIGINT received. Closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
