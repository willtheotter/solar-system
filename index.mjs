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
  try {
    let url = `https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&query=solar-system`;

    let response = await fetch(url);
    let data = await response.json();

    let randomImage = data.urls.full;

    res.render("index", { image: randomImage });
  } catch (error) {
    console.log("Error loading background image:", error);

    // fallback image if API fails
    res.render("index", {
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys.jpg",
    });
  }
});

/* =========================
   PLANET ROUTE (ALL PLANETS)
========================= */
app.get("/planet", (req, res) => {
  try {
    let planetName = req.query.planetName;

    let planetInfo = planets[`get${planetName}`]();

    res.render("planet", { planetInfo, planetName });
  } catch (error) {
    console.log("Planet error:", error);
    res.send("Planet not found");
  }
});

/* =========================
   NASA APOD ROUTE
========================= */
app.get("/nasa", async (req, res) => {
  try {
    let url =
      "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";

    let response = await fetch(url);
    let data = await response.json();

    res.render("nasa", { data });
  } catch (error) {
    console.log("NASA API error:", error);
    res.send("Error loading NASA data");
  }
});

/* =========================
   SERVER START (RENDER READY)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});