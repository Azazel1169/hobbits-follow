const express = require("express"); // requires the express npm module
const db = require("./data/db");

const server = express(); // creates an express application using express module
server.use(express.json());

let id = 0;
const getId = () => ++id;
const hobbits = [
  { id: 1, name: "Samwise Gamgee" },
  { id: 2, name: "Frodo Baggins" },
];

server.get("/hobbits", (req, res) => {
  // route handler code here.

  res.status(200).json(hobbits);
});
server.get("/hobbits/:id", (req, res) => {
  res.status(200).json(hobbits.find((hob) => hob.id == req.params.id));
});
server.post("/hobbits", (req, res) => {
  hobbits.push({ id: getId(), name: req.body.name });
  res.status(201).json(hobbits);
});
server.put("/hobbits/:id", (req, res) => {
  hobbits = hobbits.map((hob) =>
    hob.id == req.params.id ? { ...hob, name: req.body.name } : hob
  );
  res.status(200).json(hobbits);
});
server.delete("/hobbits/:id", (req, res) => {
  hobbits = hobbits.filter((hob = hob.id != req.params.id));
  res.status(200).json(hobbits);
});

// Pulling data from the db file
server.get("/users", async (req, res) => {
  db.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

server.listen(8000, () => {
  console.log("API listening on port 8000"); // opens a port for the express module to work on
});
