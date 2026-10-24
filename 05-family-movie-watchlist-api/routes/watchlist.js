import { Router } from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const watchlistRouter = Router();

// Blindagem de segurança: todas as rotas de watchlist exigem autenticação válida
watchlistRouter.use(authenticate);

// GET /api/watchlist/:userId — visualização permitida para qualquer membro autenticado
watchlistRouter.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found." });
  }

  return res.status(200).json(watchlist);
});

// POST /api/watchlist/:userId/movies — inclusão com barreira RBAC
watchlistRouter.post("/:userId/movies", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movie = addMovie(userId, req.body);

  if (!movie) {
    return res.status(404).json({ error: "User not found." });
  }

  return res.status(201).json(movie);
});

// PUT /api/watchlist/:userId/movies/:movieId — alteração com barreira RBAC
watchlistRouter.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const updatedMovie = updateMovie(userId, movieId, req.body);

  if (!updatedMovie) {
    return res.status(404).json({ error: "Movie not found." });
  }

  return res.status(200).json(updatedMovie);
});

// DELETE /api/watchlist/:userId/movies/:movieId — remoção com barreira RBAC
watchlistRouter.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const deleted = deleteMovie(userId, movieId);

  if (!deleted) {
    return res.status(404).json({ error: "Movie not found." });
  }

  return res.status(200).json({ message: "Movie removed successfully." });
});

export default watchlistRouter;
