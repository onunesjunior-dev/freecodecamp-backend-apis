import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findByUsername } from "../utils/db.js";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretfamilykey123";

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  // Validação de presença obrigatória de credenciais
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Busca do registro do usuário
  const user = findByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Validação de senha compatível com hash bcrypt e texto puro de fallback
  const isMatch = user.passwordHash
    ? bcrypt.compareSync(password, user.passwordHash)
    : user.password === password;

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Emissão do token assinado com claims de autorização
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.status(200).json({ token });
});

export default authRouter;
