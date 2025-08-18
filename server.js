// Importa o módulo 'express' para criar o servidor web
import express from "express";

// Importa os dados dos bruxos de um arquivo local
import bruxos from "./src/data/bruxos.js";

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta onde o servidor irá rodar
const PORT = 3000;

// Middleware para processar requisições com corpo no formato JSON
app.use(express.json());

// Define uma rota GET para a URL inicial ("/")
app.get("/", (req, res) => {
  res.send("<h1>Bem-vindo ao Mundo de Harry Potter!</h1>");
});
// Nota: A rota de baixo para `/bruxos` é mais completa. Esta aqui será sobrescrita.
app.get("/bruxos", (req, res) => {
  // Retorna a lista de bruxos em formato JSON
  res.json(bruxos);
});

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(
    `🧙‍♂️ API dos Bruxos está no ar na porta  https://localhost:${PORT}`
  );
});

// Define uma rota GET com um parâmetro de URL dinâmico chamado "id"
app.get("/bruxos/:id", (req, res) => {
  // Pega o ID da URL e converte-o para um número inteiro
  const id = parseInt(req.params.id);

  // Busca o bruxo na lista pelo ID usando o método 'find'
  const bruxo = bruxos.find((b) => b.id === id);

  // Verifica se o bruxo foi encontrado
  if (bruxo) {
    // Se encontrou, retorna os dados do bruxo com um status de sucesso
    res.json({
      success: true,
      message: `Bruxo ${bruxo.nome} encontrado! ⚡`,
      data: bruxo,
    });
  } else {
    // Se não encontrou, retorna um status de erro 404 (Não Encontrado)
    res.status(404).json({
      success: false,
      error: "Não existe esse bruxo! 😢",
      message: `Nenhum bruxo com ID ${id} foi encontrado`,
      codigo: "WIZARD_NOT_FOUND",
    });
  }
});

app.get("/bruxos/nome/:nome", (req, res) => {
  let nome = req.params.nome;
  const bruxosNome = bruxos.find((b) => b.nome === nome);

  if (bruxosNome) {
    res.status(200).json(bruxosNome);
  } else {
    res.status(404).json({
      mensagem: "Esse bruxo nao existe 😢",
    });
  }
});

// para um mesmo caminho e verbo HTTP será usada.
app.get("/bruxos", (req, res) => {
  res.json({
    success: true,
    message: "Todos os bruxos de Hogwarts! 🏰",
    data: bruxos,
    total: bruxos.length,
  });
});

app.listen(3000, () => {
  console.log("🧙‍♂️ API dos Bruxos rodando na porta 3000!");
});
