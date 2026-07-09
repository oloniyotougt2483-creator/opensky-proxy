const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    const query = new URLSearchParams(req.query).toString();
    const target = "https://opensky-network.org/api/states/all?" + query;
    const response = await fetch(target);
    const data = await response.text();
    res.set("Content-Type", "application/json");
    res.status(response.status).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({
      error: "Proxy failed",
      message: err.message,
      cause: err.cause ? String(err.cause) : null
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
