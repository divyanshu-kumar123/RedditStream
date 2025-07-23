require("dotenv").config(); // 👈 Load .env first
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const credentials = Buffer.from(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
  ).toString("base64");
  console.log(process.env.REDDIT_CLIENT_ID,"and " , process.env.REDDIT_CLIENT_SECRET);

  try {
    const response = await axios.post(
      "https://www.reddit.com/api/v1/access_token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "web:redditstream:v1.0.0 (by /u/testuser123)",
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    console.log("✅ New access token obtained");
    return accessToken;
  } catch (err) {
    console.error("❌ Failed to fetch token:", err.response?.data || err.message);
    throw err;
  }
}

app.get("/api/reddit", async (req, res) => {
  try {
    const after = req.query.after || "";
    const token = await getAccessToken();

    const redditResponse = await axios.get(
      `https://oauth.reddit.com/r/reactjs.json?after=${after}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "web:redditstream:v1.0.0 (by /u/testuser123)",
        },
      }
    );

    res.json(redditResponse.data);
  } catch (err) {
    console.error("❌ Error fetching Reddit posts:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
