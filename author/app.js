const express = require("express");
const app = express();
var path = require("path");
const fetch = require("node-fetch");
var admin = require("firebase-admin");
var serviceAccount = require("./accountKey2.json");
const mysql = require("mysql");
const dbConfig = require("./db.config.js");
const sql = require("./db.js");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const port = 3001;

findById = (id, result) => {
  sql.query(`SELECT title FROM book HAVING title = "${id}" `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      //result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      //result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    //result({ kind: "not_found" }, null);
  });
};

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/search/:query", function (req, res) {
  const title = req.params.query;
  findById(title);
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}+&key=AIzaSyB6vrb-b0HwJDZTHPyHd_skMT41qBuVI34`
  )
    .then((res) => res.json())
    .then((result) =>
      res.json({ message: result.items[0].volumeInfo.authors[0] })
    );
});

app.get("/books", async (req, res) => {
  const books = [];
  const snapshot = await db.collection("books").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    books.push(docU);
  });
  res.send(books);
});

app.post("/books/add/:query", async (req, res) => {
  var title = req.params.query;
  var data;
  const setData = (val) => {
    data = val;
  };
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}+&key=AIzaSyB6vrb-b0HwJDZTHPyHd_skMT41qBuVI34`
  )
    .then((res) => res.json())
    .then((result) => {
      const snapshot = db.collection("books").add(result);
      res.send(snapshot);
    });
});

app.delete("/books/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const books = [];
  const snapshot = await db.collection("books").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    books.push(docU);
  });
  for (var i = 0; i < books.length; i++) {
    if (books[i].items[0].volumeInfo.title === title)
      docToDeleteId = books[i].id;
  }
  const bookies = await db.collection("books").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
