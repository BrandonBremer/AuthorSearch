const express = require("express");
const app = express();
var path = require("path");
const fetch = require("node-fetch");
var admin = require("firebase-admin");
var serviceAccount = require("./accountKey2.json");
//const mysql = require("mysql");
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
insertNewBook = (
  Title,
  Price,
  published,
  rating,
  ISBN,
  AuthID,
  PubID,
  user
) => {
  sql.query(
    `INSERT INTO book (Title, Price, PublishedDate, Rating, ISBN, AuthID, PubID, UID) 
    VALUES("${Title}", ${Price}, ${published}, ${rating}, ${ISBN}, ${AuthID}, ${PubID}, ${user})`,
    (err, res) => {
      if (err) throw err;
    }
  );
};
deleteBook = (title) => {
  sql.query(`SELECT UID FROM users WHERE loggedIn = 1`, (err, books) => {
    if (err) {
      console.log("error: ", err);
    }
    sql.query(
      `DELETE FROM book WHERE title = "${title}" AND UID =${books[0].UID}`,
      (err, res) => {
        if (err) throw err;
      }
    );
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
app.get("/sqlBooks/", async (req, res) => {
  const books = [];
  var UID = req.params.query;
  sql.query(
    `SELECT Title, Rating FROM book WHERE UID IN (SELECT UID FROM users WHERE loggedIn = 1)`,
    (err, books) => {
      if (err) {
        console.log("error: ", err);
      }

      res.send(books);
    }
  );
});
app.post("/books/add/:query", async (req, res) => {
  var title = req.params.query;
  var data;
  sql.query(`SELECT UID FROM users WHERE loggedIn = 1`, (err, books) => {
    if (err) {
      console.log("error: ", err);
    }
    insertNewBook(
      title,
      20,
      11 / 1 / 1999,
      3,
      Math.random() * 10000,
      1,
      1,
      books[0].UID
    );
  });
});

app.delete("/books/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const books = [];
  deleteBook(title);
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
app.get("/sort", async (req, res) => {
  const books = [];
  sql.query(
    `SELECT Title, Rating FROM book WHERE UID IN (SELECT UID FROM users WHERE loggedIn = 1) ORDER BY rating ASC`,
    (err, books) => {
      if (err) {
        console.log("error: ", err);
      }

      res.send(books);
    }
  );
});
app.get("/sortTitle", async (req, res) => {
  const books = [];
  sql.query(
    `SELECT Title, Rating FROM book WHERE UID IN (SELECT UID FROM users WHERE loggedIn = 1) ORDER BY Title ASC`,
    (err, books) => {
      if (err) {
        console.log("error: ", err);
      }

      res.send(books);
    }
  );
});
app.get("/reviews/:query", async (req, res) => {
  const books = [];
  var title = req.params.query;
  sql.query(
    `SELECT Content FROM review WHERE title = "${title}"`,
    (err, books) => {
      if (err) {
        console.log("error: ", err);
      }

      res.send(books);
    }
  );
});
app.get("/review/update/:query/:query2", async (req, res) => {
  var content = req.params.query;
  var title = req.params.query2;
  sql.query(
    `INSERT INTO review (Content, RevID, Rating,Title) 
    VALUES("${content}", ${Math.random() * 100},  ${
      Math.random() * 5
    }, "${title}")`,
    (err, res) => {
      if (err) throw err;
    }
  );
  //console.log("yp");
});
app.get("/login/:query/:query2", async (req, res) => {
  var user = req.params.query;
  var password = req.params.query2;
  sql.query(
    `UPDATE users SET loggedIn = true WHERE UFirst = "${user}" AND pass = PASSWORD('${password}')`,
    (err, id) => {
      if (err) throw err;
      res.send(id);
      console.log(id);
    }
  );
});

app.get("/logout/:query/:query2", async (req, res) => {
  var user = req.params.query;
  var password = req.params.query2;
  sql.query(
    `UPDATE users SET loggedIn = false WHERE UFirst = "${user}" AND pass= PASSWORD('${password}')`,
    (err, id) => {
      if (err) throw err;

      res.send(id);
      // console.log(id);
      // console.log(id[0].UID);
    }
  );
});
app.get("/signup/:query/:query2", async (req, res) => {
  var user = req.params.query;
  var password = req.params.query2;
  sql.query(
    `INSERT INTO users (UID, UFirst, ULast, loggedIn, pass) VALUES (${
      Math.random() * 10000
    },"${user}","The",0, PASSWORD('${password}'))`,
    (err, id) => {
      if (err) throw err;

      res.send(id);
      // console.log(id);
      // console.log(id[0].UID);
    }
  );
});
