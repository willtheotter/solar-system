import express from "express";
import fetch from "node-fetch";

const planets = (await import("npm-solarsystem")).default;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

/* =========================
   HOME (Random Background)
========================= */
app.get("/", async (req, res) => {
  let url = `https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&query=solar-system`;

  let response = await fetch(url);
  let data = await response.json();

  let randomImage = data.urls.full;

  res.render("index", { image: randomImage });
});

/* =========================
   PLANET ROUTE (ALL PLANETS)
========================= */
app.get("/planet", (req, res) => {
  let planetName = req.query.planetName;

  let planetInfo = planets[`get${planetName}`]();

  res.render("planet", { planetInfo, planetName });
});

/* =========================
   NASA APOD ROUTE
========================= */
app.get("/nasa", async (req, res) => {
  let url =
    "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";

  let response = await fetch(url);
  let data = await response.json();

  res.render("nasa", { data });
});

/* ========================= */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});