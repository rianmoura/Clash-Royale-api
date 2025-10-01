const express = require("express");
const axios = require("axios");

const app = express();


// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Se alguém acessar /, manda o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// O Render obriga usar process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


