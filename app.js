const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const port = 3000;

const notes = [];

/* ---------------- APLICANDO O GET (READ) -------------------------- */

app.get("/notes", (req, res) => {
  //   setTimeout(() => {
  //     res.json({ campo: 123 });
  //   }, 3000);

  res.json(notes);
});

/* ---------------- APLICANDO O GET DETALHADO -------------------------- */

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Informe o campo id" });
  }

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res
      .status(400)
      .json({ message: "Nenhuma anotação encontrada para o id informado!" });
  }

  res.json(note);
});

/* ---------------- APLICANDO O POST (CREATE) -------------------------- */

app.post("/notes", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title) {
    return res.status(400).json({ message: "Informe o campo title" });
  }

  if (!description) {
    return res.status(400).json({ message: "Informe o campo description" });
  }

  notes.push({ id: uuidv4(), title, description });

  res.json({ message: "Anotação salva com sucesso" });
});

/* ---------------- APLICANDO O PUT (UPDATE) -------------------------- */

app.put("/notes", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;

  if (!id) {
    return res.status(400).json({ message: "Informe o campo id" });
  }

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res
      .status(400)
      .json({ message: "Nenhuma anotação encontrada para o id informado!" });
  }

  if (!title) {
    return res.status(400).json({ message: "Informe o campo title" });
  }

  if (!description) {
    return res.status(400).json({ message: "Informe o campo description" });
  }

  for (const noteObject of notes) {
    if (noteObject.id === id) {
      noteObject.title = title;
      noteObject.description = description;
    }
  }

  res.json({ message: "Anotação alterada com sucesso" });
});

/* ---------------- APLICANDO O DELETE (DELETE) -------------------------- */

app.delete("/notes", (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ message: "Informe o campo id" });
  }

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res
      .status(400)
      .json({ message: "Nenhuma anotação encontrada para o id informado!" });
  }

  for (const index in notes) {
    if (notes[index].id === id) {
      notes.splice(index, 1);
    }
  }

  res.json({ message: "Anotação excluída com sucesso" });
});

/* ---------------- API RODANDO -------------------------- */

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
