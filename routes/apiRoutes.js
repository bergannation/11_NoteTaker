// LOAD DATA
// We are linking our routes to a series of "data" sources.

let newNotes = require("../db/newNotes");

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// ROUTING

module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.json(newNotes));

  app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    //
    console.log("Req.body:", newNote);
    newNotes.push(newNote);

    writeFileAsync("./db/newNotes.json", JSON.stringify(newNotes)).then(
      function () {
        console.log("Update made to newNotes.json");
      }
    );

    res.json(newNote);
  });
};
