const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMwMmQzZDNhLTllMGYtNDYxNy04ZjliLTI5MDE4NTg5NTZlYyIsImlhdCI6MTc1OTMxNDg2Miwic3ViIjoiZGV2ZWxvcGVyL2ZjMzdmNzIzLThlNTEtNTcxMS05MjUxLWZlOTZlYzUzMTk2MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NC4yMzMuMTUxLjI3Il0sInR5cGUiOiJjbGllbnQifV19.um28nc-Q2Fyd0sHvFYFTcshATxNqvLz_nKGUmW8BxkOEMr0mMbubalIV06Yzz1yU21t3e_yzuZKDhbJLz82-4Q";

app.use(express.static(path.join(__dirname, "public")));

app.get("/player/:tag", async (req, res) => {
  const tag = encodeURIComponent(req.params.tag); // garante %23
  try {
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/${tag}`,
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

