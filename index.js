const express = require("express");
const Path = require("path");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.static(Path.join(__dirname, "public")));

let posts = [
  { id: "1a", username: "gautham yamarthi", content: "I LOVE CODING 2" },
  { id: "2b", username: "sindhuja", content: "I LOVE CODING 3" },
  { id: "3c", username: "saraswathi", content: "I LOVE CODING 4" },
  { id: "4d", username: "chandrashekar", content: "I LOVE CODING 5" },
];

// Routes
app.get("/", (req, res) => {
  res.send("Server working well!");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = Math.random().toString(36).substr(2, 4);
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.content = content;
  }
  res.redirect("/posts");
});

app.post("/posts/:id/delete", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`✅ Server listening on port: ${port}`);
});
