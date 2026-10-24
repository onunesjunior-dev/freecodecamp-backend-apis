import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Endpoint 1: Rota sem parâmetro (retorna horário atual)
app.get("/api", (_req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Endpoint 2: Rota com parâmetro dinâmico de data
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let parsedDate;

  // Se for uma string puramente numérica (timestamp em ms), converte com parseInt
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date, 10));
  } else {
    parsedDate = new Date(date);
  }

  // Se a data for inválida, responde o erro padronizado exigido pelos testes
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Retorna os dois formatos serializados em JSON
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
