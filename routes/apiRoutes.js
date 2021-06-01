// LOAD DATA
// We are linking our routes to a series of "data" sources.

let newNotes = require("../db/newNotes");

// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(newNotes));

  app.post("/api/notes", (req, res) => {
    let newNote = req.body;
  });
};
