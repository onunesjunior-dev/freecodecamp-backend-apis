import http from "http";
import fs from "fs";
import { WebSocketServer, WebSocket } from "ws";

const PORT = 3001;

// 1. Servidor HTTP que serve os arquivos da interface
const server = http.createServer((req, res) => {
  if (req.url === "/script.js") {
    fs.readFile("./public/script.js", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading script.js");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
    return;
  }

  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading index.html");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// 2. Servidor WebSocket acoplado ao servidor HTTP na porta 3001
const wss = new WebSocketServer({ server });

// Função auxiliar de transmissão para todos os clientes ativos
function broadcast(message) {
  const payload = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

// 3. Gerenciamento do ciclo de vida das conexões
wss.on("connection", (socket, req) => {
  // Extrai o nome de usuário da query string da URL de upgrade
  const username = new URL(req.url, "http://localhost").searchParams.get(
    "username",
  );

  // Notifica todos os clientes que um novo usuário entrou
  broadcast({ type: "system", text: `${username} joined` });

  // Escuta novas mensagens de chat enviadas por este socket
  socket.on("message", (data) => {
    const { username: senderName, text } = JSON.parse(data);
    broadcast({ type: "chat", username: senderName, text });
  });

  // Notifica todos os clientes quando o usuário se desconecta
  socket.on("close", () => {
    broadcast({ type: "system", text: `${username} left` });
  });
});

// 4. Inicialização do servidor na porta 3001
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});
