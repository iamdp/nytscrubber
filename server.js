const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors());

const path = require("path");

const db = require("./controller/articleController");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/scrub/:q/:begin_date/:end_date", (req, res) => {
  const query = {
    q: req.params.q,
    begin_date: req.params.begin_date,
    end_date: req.params.end_date
  };
  db.scrub(query, result => {
    res.send(result);
  });
});

app.get("/api/savedArticles", (req, res) => {
  db.getSavedArticles(result => {
    res.send(result);
  });
});

app.post("/api/saveArticle", (req, res) => {
  const articleToSave = {
    title: req.body.title,
    url: req.body.url
  };

  db.saveArticle(articleToSave, response => res.send(response));
});

app.delete("/api/deletedSavedArticle/:id", (req, res) => {
  db.deleteSavedArticle(req.params.id, response => {
    res.send(response);
  });
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
