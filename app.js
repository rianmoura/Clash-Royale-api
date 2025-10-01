const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();



const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM3MjRmYTIxLTY4ZGQtNGJhZC1hYzlhLTc2YmZiYjM1NTE1NiIsImlhdCI6MTc1OTMxNzQwMiwic3ViIjoiZGV2ZWxvcGVyL2ZjMzdmNzIzLThlNTEtNTcxMS05MjUxLWZlOTZlYzUzMTk2MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNC4yMTEuMjAwLjg1IiwiNDQuMjMzLjE1MS4yNyIsIjM1LjE2MC4xMjAuMTI2Il0sInR5cGUiOiJjbGllbnQifV19.NKxyWP2Nrr_qjbEWxGp8OaWdQ4dqcfY34yM0lGriP3HjrsjPHIWHyqEytiguNg5dqCiUq7FB5yIRqu0jySz4Wg";



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
// O Render obriga usar process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});






