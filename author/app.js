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

findById = (id) => {
  sql.query(`SELECT Title FROM book HAVING title = "${id}" `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return err;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      return res[0];
    }
  });
};
findAuthorFromID = (id) => {
  sql.query(
    `SELECT fname,lname FROM authors HAVING id= "${id}" `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }

      if (res.length) {
        console.log("found book: ", res[0]);
        return res[0];
      }
    }
  );
};
insertNewBook = (Title, Price, published, rating, ISBN, AuthID, PubID) => {
  sql.query(
    `INSERT INTO book (Title, Price, PublishedDate, Rating, ISBN, AuthID, PubID) 
    VALUES("${Title}", ${Price}, ${published}, ${rating}, ${ISBN}, ${AuthID}, ${PubID})`,
    (err, res) => {
      if (err) throw err;
    }
  );
};
deleteBook = (title) => {
  sql.query(`DELETE FROM book WHERE title = "${title}"`, (err, res) => {
    if (err) throw err;
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
  book = findById(title);
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
app.get("/sqlBooks", async (req, res) => {
  const books = [];
  sql.query(`SELECT Title, Rating FROM book`, (err, books) => {
    if (err) {
      console.log("error: ", err);
    }

    res.send(books);
  });
});
app.post("/books/add/:query", async (req, res) => {
  var title = req.params.query;
  var data;
  insertNewBook(title, 20, 11 / 1 / 1999, 3, 12315540, 1, 1);
  //const setData = (val) => {
  // data = val;
  //};
  //fetch(
  // `https://www.googleapis.com/books/v1/volumes?q=${title}+&key=AIzaSyB6vrb-b0HwJDZTHPyHd_skMT41qBuVI34`
  //)
  //.then((res) => res.json())
  //.then((result) => {
  // const snapshot = db.collection("books").add(result);
  //res.send(snapshot);
  //});
});

app.delete("/books/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const books = [];
  // const snapshot = await db.collection("books").get();
  deleteBook(title);
  //snapshot.forEach((doc) => {
  //  let docU = { ...doc.data(), id: doc.id };
  //  books.push(docU);
  // });
  //for (var i = 0; i < books.length; i++) {
  //  if (books[i].items[0].volumeInfo.title === title)
  //   docToDeleteId = books[i].id;
  // }
  // const bookies = await db.collection("books").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
app.get("/books/update/:query/:query2", async (req, res) => {
  var rate = req.params.query;
  var title = req.params.query2;
  sql.query(
    `UPDATE book SET rating = ${rate} WHERE title = "${title}"`,
    (err, books) => {
      if (err) {
        console.log("error: ", err);
      }

      res.send(books);
    }
  );
});
