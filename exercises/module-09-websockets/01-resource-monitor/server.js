import http from "http";
import fs from "fs";
import os from "os";
import { WebSocketServer } from "ws";

// Coleta métricas de hardware da máquina
function getMetrics() {
  return {
    loadAvg: os.loadavg(),
    freeMemMB: (os.freemem() / 1024 / 1024).toFixed(0),
    totalMemMB: (os.totalmem() / 1024 / 1024).toFixed(0),
    memUsagePct: (
      ((os.totalmem() - os.freemem()) / os.totalmem()) *
      100
    ).toFixed(1),
  };
}

// Servidor HTTP servindo index.html e script.js
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

// Servidor WebSocket compartilhando a porta 3000
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  // Streaming a cada 1000ms
  const interval = setInterval(() => {
    socket.send(JSON.stringify(getMetrics()));
  }, 1000);

  socket.on("message", (data) => {
    console.log("Received:", data.toString());
  });

  socket.on("close", () => {
    clearInterval(interval); // Prevenção de vazamento de memória
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
