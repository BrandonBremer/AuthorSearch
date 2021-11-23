import "./App.css";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
function Search() {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(userInput);
    //findByID(userInput);
    fetch(`/search/${userInput}`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
    console.log(data);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    fetch(`/books/add/${userInput}`, {
      method: "POST",
      body: JSON.stringify({
        Title: "foo",
        Author: "bar",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    setUserInput("");
    setData("");
  };
  return (
    <div className="App">
      <p>
        <form onSubmit={handleSubmit}>
          <Input
            value={userInput}
            color="secondary"
            type="text"
            onChange={handleChange}
            placeholder="Enter a book title!"
          />
          <Button variant="contained" type="submit">
            Find Author
          </Button>
        </form>
        <Button variant="contained" onClick={handleSubmit2}>
          Add to your collection
        </Button>

        <h2>
          The Author of {userInput} is: {data}
        </h2>
      </p>
    </div>
  );
}

export default Search;
