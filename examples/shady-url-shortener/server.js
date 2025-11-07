import express from "express";
import path from "path";
import { DatabaseSync } from "node:sqlite";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(""));

const db = new DatabaseSync("urls.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shortCode TEXT NOT NULL UNIQUE,
        longUrl TEXT NOT NULL,
        shadyPercentage INTEGER NOT NULL DEFAULT 0
    )
`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function generateShortCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/shorten", (req, res) => {
  try {
    const { longUrl } = req.body;
    const shadyPercentage = parseInt(req.body.shadyPercentage, 10) || 0;

    if (!longUrl) return res.status(400).json({ error: "URL is required" });

    const shortCode = generateShortCode();

    const stmt = db.prepare(
      "INSERT INTO urls (shortCode, longUrl, shadyPercentage) VALUES (?, ?, ?)"
    );
    stmt.run(shortCode, longUrl, shadyPercentage);

    const fullShortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    res.json({ shortUrl: fullShortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred." });
  }
});

app.get("/:shortCode", (req, res) => {
  try {
    const { shortCode } = req.params;
    const stmt = db.prepare("SELECT * FROM urls WHERE shortCode = ?");
    const urlData = stmt.get(shortCode);

    if (!urlData)
      return res.status(404).send("<h1>404: Shady URL not found!</h1>");

    const shouldBeShady = Math.random() < urlData.shadyPercentage / 100;

    if (shouldBeShady) {
      return res.redirect(RICK_ROLL_URL);
    }

    return res.redirect(urlData.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("<h1>Server Error</h1>");
  }
});

app.listen(port, () => {
  console.log(`Shady URL Shortener running on port ${port}`);
});
