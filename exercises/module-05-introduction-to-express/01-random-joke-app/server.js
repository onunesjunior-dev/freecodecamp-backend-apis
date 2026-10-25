const express = require("express");
const app = express();
const port = 3000;

// Base de dados de piadas em memória
const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  "I told my computer I needed a break, and it said \"No problem, I'll go to sleep.",
  "Why do Java developers wear glasses? Because they don't see sharp.",
];

// Rota 1: Endpoint Raiz (Boas-vindas)
app.get("/", (req, res) => {
  res.send("Welcome to the Random Joke Server! Visit /joke to get a random joke.");
});

// Rota 2: Endpoint Dinâmico (Sorteio Aleatório de Piada)
app.get("/joke", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(randomJoke);
});

// Rota 3: Endpoint de Metadados / Sobre
app.get("/about", (req, res) => {
  res.send("This Random Joke Server was built with Express.js");
});

// Inicialização do Servidor na porta 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
