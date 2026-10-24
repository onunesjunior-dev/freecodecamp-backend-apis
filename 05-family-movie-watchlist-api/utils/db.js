import path from "path";
import fs from "fs";

const DB_PATH = path.join(import.meta.dirname, "../data/users.json");

export function readUsers() {
  const data = fs.readFileSync(DB_PATH, "utf-8").trim();
  if (!data) return [];
  return JSON.parse(data);
}

export function writeUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function findByUsername(username) {
  return readUsers().find((u) => u.username === username) || null;
}

export function findById(id) {
  return readUsers().find((u) => u.id === id) || null;
}

export function getWatchlist(userId) {
  const user = findById(userId);
  return user ? user.watchlist : null;
}

export function addMovie(userId, movie) {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const newMovie = { id: Date.now(), ...movie };
  user.watchlist.push(newMovie);
  writeUsers(users);
  return newMovie;
}

export function updateMovie(userId, movieId, changes) {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const movie = user.watchlist.find((m) => m.id === movieId);
  if (!movie) return null;

  Object.assign(movie, changes);
  writeUsers(users);
  return movie;
}

export function deleteMovie(userId, movieId) {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return false;

  const index = user.watchlist.findIndex((m) => m.id === movieId);
  if (index === -1) return false;

  user.watchlist.splice(index, 1);
  writeUsers(users);
  return true;
}
