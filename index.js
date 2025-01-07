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
  const sortField = req.query.sortby || id;
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee",
    },
    {
      id: 2,
      name: "Frodo Baggins",
    },
  ];
  const response = hobbits.sort((a, b) =>
    a[sortField] < b[sortField] ? -1 : 1
  );
  res.status(200).json(response);
});
server.get("/hobbits/:id", (req, res) => {
  res.status(200).json(hobbits.find((hob) => hob.id == req.params.id));
});
server.post("/hobbits", (req, res) => {
  res.status(201).json({ url: "/hobbits", operation: "POST" });
});
server.put("/hobbits", (req, res) => {
  res.status(200).json({ url: "/hobbits", operation: "PUT" });
});
server.delete("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    url: `/hobbits/${id}`,
    operation: `DELETE for hobbit with id ${id}`,
  });
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
