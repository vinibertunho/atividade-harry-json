// Importa o módulo 'express' para criar o servidor web
import express from "express";

// Importa os dados de um arquivo local
import dados from "./src/data/dados.js";

// Desestrutura os dados importados para fácil acesso
const { bruxos, casas, varinha, pocoes, animais } = dados;

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta onde o servidor irá rodar
const PORT = 3000;

// Middleware para processar requisições com corpo no formato JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("<h1>Bem-vindo ao Mundo de Harry Potter!</h1>");
});

// --- ROTAS DE BRUXOS ---

// Rota para obter todos os bruxos
app.get("/bruxos", (req, res) => {
  res.json({
    success: true,
    message: "Todos os bruxos de Hogwarts! 🏰",
    data: bruxos,
    total: bruxos.length,
  });
});

// Rota para obter um bruxo pelo ID
app.get("/bruxos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bruxo = bruxos.find((b) => b.id === id);

  if (bruxo) {
    res.status(200).json({
      success: true,
      message: `Bruxo ${bruxo.nome} encontrado! ⚡`,
      data: bruxo,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Nenhum bruxo com ID ${id} foi encontrado. 😢`,
    });
  }
});

// Rota para obter um bruxo pelo nome
app.get("/bruxos/nome/:nome", (req, res) => {
  // Busca case-insensitive para melhorar a experiência
  const nome = req.params.nome.toLowerCase();
  const bruxoEncontrado = bruxos.find((b) => b.nome.toLowerCase() === nome);

  if (bruxoEncontrado) {
    res.status(200).json(bruxoEncontrado);
  } else {
    res.status(404).json({
      mensagem: "Esse bruxo não existe. 😢",
    });
  }
});

// Rota para buscar bruxos por casa
app.get("/bruxos/casas/:casa", (req, res) => {
  const casa = req.params.casa.toLowerCase();
  const bruxosCasa = bruxos.filter((b) => b.casa.toLowerCase() === casa);

  if (bruxosCasa.length > 0) {
    res.status(200).json(bruxosCasa);
  } else {
    res.status(404).json({
      mensagem: "Nenhum bruxo se encontra nessa casa. 😢",
    });
  }
});

// --- ROTAS DE CASAS ---
app.get("/casas", (req, res) => {
  if (casas.length > 0) {
    res.status(200).json(casas);
  } else {
    // Corrigido: o JSON deve ser passado como um objeto dentro do método .json()
    res.status(404).json({ mensagem: "Nenhuma casa encontrada." });
  }
});

// --- ROTAS DE VARINHAS ---
app.get("/varinhas", (req, res) => {
  if (varinha.length > 0) {
    res.status(200).json(varinha);
  } else {
    res.status(404).json({ mensagem: "Nenhuma varinha encontrada." });
  }
});

// ✨ NOVA ROTA: Buscar varinha por ID
app.get("/varinhas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const varinhaEncontrada = varinha.find((v) => v.id === id);

  if (varinhaEncontrada) {
    res.status(200).json(varinhaEncontrada);
  } else {
    res.status(404).json({
      mensagem: `Varinha com ID ${id} não encontrada. 😢`,
    });
  }
});

// --- ROTAS DE POÇÕES ---
app.get("/pocoes", (req, res) => {
  if (pocoes.length > 0) {
    res.status(200).json(pocoes);
  } else {
    res.status(404).json({ mensagem: "Nenhuma poção encontrada." });
  }
});

// ✨ NOVA ROTA: Buscar poção por ID
app.get("/pocoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pocaoEncontrada = pocoes.find((p) => p.id === id);

  if (pocaoEncontrada) {
    res.status(200).json(pocaoEncontrada);
  } else {
    res.status(404).json({
      mensagem: `Poção com ID ${id} não encontrada. 🧪`,
    });
  }
});

// --- ROTAS DE ANIMAIS ---
app.get("/animais", (req, res) => {
  if (animais.length > 0) {
    res.status(200).json(animais);
  } else {
    res.status(404).json({ mensagem: "Nenhum animal encontrado." });
  }
});

// ✨ NOVA ROTA: Buscar animal por ID
app.get("/animais/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const animalEncontrado = animais.find((a) => a.id === id);

  if (animalEncontrado) {
    res.status(200).json(animalEncontrado);
  } else {
    res.status(404).json({
      mensagem: `Animal com ID ${id} não encontrado. 🐾`,
    });
  }
});


// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(
    `🧙‍♂️ API do Mundo Mágico está no ar em http://localhost:${PORT}`
  );
});