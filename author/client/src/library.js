import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Routes from "./routes.js";
function Library() {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = React.useState("");

  // const listItems = books.map((book) => (
  //   <li>{book.items[0].volumeInfo.title}</li>
  // ));
  //useEffect(() => {
  //  fetch(`/books`)
  //     .then((res) => res.json())
  //   .then((data) => setBooks(data));
  //});
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    var id = userInput;
    // e.preventDefault();
    for (var i = 0; i < books.length; i++) {
      if (
        typeof books[i].items != "undefined" &&
        books[i].items[0].volumeInfo.title === userInput
      ) {
        id = books[i].items[0].volumeInfo.title;
      }
    }

    // console.log(id);
    fetch(`/books/delete/${userInput}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Title: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUserInput("");
  };
  const handleSubmit2 = (e) => {
    fetch(`/sqlBooks`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
    console.log(books[0]);
  };
  // {b.items[0].volumeInfo.title} By {b.items[0].volumeInfo.authors[0]}
  return (
    <div>
      <p>
        {books.map((b) => (
          <p>{b.Title}</p>
        ))}

        <Input
          value={userInput}
          color="secondary"
          type="text"
          onChange={handleChange}
          placeholder="Enter a book title!"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Delete Book
        </Button>
        <Button variant="contained" onClick={handleSubmit2}>
          Load Library
        </Button>
      </p>
    </div>
  );
}
export default Library;
