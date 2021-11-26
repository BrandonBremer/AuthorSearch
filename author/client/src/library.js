import React, { useRef, useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Routes from "./routes.js";
import MyContext from "./login.js";
function Library() {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = React.useState("");
  const [readMore, setReadMore] = useState(false);
  const [updateTarget, setUpdate] = React.useState("");
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdate(e.currentTarget.value);
  };

  const linkName = readMore ? "Read Less << " : "Read More >> ";
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
    // console.log(user.user);
    fetch(`/sqlBooks`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
    console.log(books[0]);
  };
  const handleSubmitUpdate = (book) => {
    var rate = updateTarget;

    fetch(`/books/update/${rate}/${book}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUpdate("");
  };
  const sort = (obj) => {
    fetch(`/sort`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };
  const sortTitle = (obj) => {
    fetch(`/sortTitle`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };
  return (
    <div>
      <p>
        {books.map((b) => (
          <p>
            {b.Title}

            {readMore && <br></br>}
            {readMore && " Rating" + b.Rating}
            {readMore && <br></br>}
            {readMore && (
              <Input
                value={updateTarget}
                color="secondary"
                type="text"
                onChange={handleChangeUpdate}
                placeholder="Rate this!"
              />
            )}
            {readMore && <br></br>}
            {readMore && (
              <Button
                variant="contained"
                onClick={() => handleSubmitUpdate(b.Title)}
              >
                Update Rating
              </Button>
            )}
          </p>
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
        <Button variant="contained">
          <a
            className="read-more-link"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            {"View Details"}
          </a>
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            sort(books);
          }}
        >
          Sort by Rating
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            sortTitle(books);
          }}
        >
          Sort by Title
        </Button>
      </p>
    </div>
  );
}
export default Library;
