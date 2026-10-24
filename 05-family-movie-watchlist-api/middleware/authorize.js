/**
 * Middleware de autorização baseada em papéis (RBAC).
 * Permite mutações irrestritas para 'parent'.
 * Permite mutações para 'child' exclusivamente em sua própria lista (:userId === user.id).
 */
export function authorizeModification(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ error: "Access denied" });
  }

  // Pais têm autoridade total de modificação
  if (req.user.role === "parent") {
    return next();
  }

  // Filhos só podem alterar a própria lista
  if (req.user.role === "child" && String(req.params.userId) === String(req.user.id)) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}
