/**
 * =====================================================================
 * PROJETO DE CERTIFICAÇÃO: Build a Personal Profile App
 * freeCodeCamp — Desenvolvimento Back-end e APIs
 * =====================================================================
 */

const express = require("express");
const app = express();
const port = 3000;

// Middleware para suporte a parsing de JSON (boa prática de segurança e robustez)
app.use(express.json());

/**
 * User Story 2:
 * GET / -> "Welcome to Camper Bot's homepage!"
 */
app.get("/", (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});

/**
 * User Story 3:
 * GET /hobbies -> "I cycle, go boating, and play guitar."
 */
app.get("/hobbies", (req, res) => {
  res.send("I cycle, go boating, and play guitar.");
});

/**
 * User Story 4:
 * GET /skills -> "JavaScript, Node.js, and Express.js!"
 */
app.get("/skills", (req, res) => {
  res.send("JavaScript, Node.js, and Express.js!");
});

/**
 * User Story 5:
 * GET /api/profile -> JSON com name, hobbies e skills
 */
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Camper Bot",
    hobbies: ["cycling", "boating", "guitar"],
    skills: ["JavaScript", "Node.js", "Express.js"]
  });
});

/**
 * User Story 1:
 * Servidor escutando na porta 3000
 */
app.listen(port, () => {
  console.log(`Personal Profile App listening at http://localhost:${port}`);
});

module.exports = app; // Exportação recomendada para suítes de testes automatizados
