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

    let previousId = newNotes[newNotes.length - 1]["id"];
    let newId = previousId + 1;
    newNote["id"] = newId;

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

  // delete notes functionality

  app.delete("/api/notes/:id", (req, res) => {
    const chosen = parseInt(req.params.id);

    console.log("request: ", chosen);

    for (let i = 0; i < newNotes.length; i++) {
      if (chosen === newNotes[i].id) {
        newNotes.splice([i], 1);
      }
    }

    writeFileAsync("./db/newNotes.json", JSON.stringify(newNotes), (err) => {});
    res.json(newNotes);
  });
};
