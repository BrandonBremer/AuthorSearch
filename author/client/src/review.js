import "./App.css";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
function Review() {
  const [data, setData] = useState("");
  const [userInput, setUserInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [updateTarget, setUpdate] = React.useState("");
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdate(e.currentTarget.value);
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
    fetch(`/reviews/${userInput}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
    //console.log(books[0]);
  };
  const handleSubmitUpdate = (book) => {
    var rate = updateTarget;

    fetch(`/review/update/${rate}/${book}`);
    setUpdate("");
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Input
          value={userInput}
          color="secondary"
          type="text"
          onChange={handleChange}
          placeholder="Enter a book title!"
        />
      </form>
      <Button variant="contained" onClick={handleSubmit2}>
        See Reviews
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        Leave a Review
      </Button>
      {readMore && (
        <p>
          <Input
            value={updateTarget}
            color="secondary"
            type="text"
            onChange={handleChangeUpdate}
            placeholder="Leave a review"
          />
        </p>
      )}
      {readMore && <br></br>}
      {readMore && (
        <Button
          variant="contained"
          onClick={() => handleSubmitUpdate(userInput)}
        >
          Send the review
        </Button>
      )}
      <h2>Reviews for {userInput}</h2>
      {reviews.map((r) => (
        <p>{r.Content}</p>
      ))}
    </div>
  );
}

export default Review;
