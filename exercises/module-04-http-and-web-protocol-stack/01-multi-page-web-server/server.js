import http from "http";
import { join, extname } from "path";
import { readFile } from "fs";

const server = http.createServer((request, response) => {
  const url = request.url === "/" ? "/index.html" : request.url;
  const filePath = join("public", url);
  const ext = extname(filePath).toLowerCase();

  const mimeTypes = {
    ".css": "text/css",
    ".js": "text/javascript",
    ".html": "text/html",
    ".png": "image/png"
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  readFile(filePath, (error, file) => {
    if (error) {
      console.error(error);
      readFile("public/404.html", (error, file) => {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(file, "utf-8");
      });
      return;
    }
    response.writeHead(200, { "Content-Type": contentType });
    response.end(file, "utf-8");
  });
});

server.listen(3001, () => console.log("Server is listening on port 3001"));
