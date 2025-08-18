import express from "express";
import bruxos from "./bruxos.js";

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Bem-vindo ao Mundo de Harry Potter!</h1>");
});

app.get("/bruxos", (req, res) => {
  res.json(bruxos);
});


app.listen(PORT, () => {
  console.log(`🧙‍♂️ API dos Bruxos está no ar na porta  http://localhost:${PORT}!`);
});
