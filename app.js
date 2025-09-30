const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

const API_KEY = "SEU_TOKEN_AQUI";

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
