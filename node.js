const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fetch live cryptocurrency prices
app.get("/api/crypto", async (req, res) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: { vs_currency: "usd" }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cryptocurrency data" });
    }
});

// Fetch historical data for a specific cryptocurrency
app.get("/api/crypto/:id/history", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: { vs_currency: "usd", days: 7 }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch historical data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
