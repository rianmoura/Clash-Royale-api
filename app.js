const express = require("express");
const axios = require("axios");

const app = express();

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Clash Royale rodando no Render! ⚔️👑");
});

// Rota para buscar jogador pela tag
app.get("/player/:tag", async (req, res) => {
  const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMwMmQzZDNhLTllMGYtNDYxNy04ZjliLTI5MDE4NTg5NTZlYyIsImlhdCI6MTc1OTMxNDg2Miwic3ViIjoiZGV2ZWxvcGVyL2ZjMzdmNzIzLThlNTEtNTcxMS05MjUxLWZlOTZlYzUzMTk2MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NC4yMzMuMTUxLjI3Il0sInR5cGUiOiJjbGllbnQifV19.um28nc-Q2Fyd0sHvFYFTcshATxNqvLz_nKGUmW8BxkOEMr0mMbubalIV06Yzz1yU21t3e_yzuZKDhbJLz82-4Q"; // coloque seu token aqui
  const tag = req.params.tag.toUpperCase();

  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${tag}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// O Render obriga usar process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
