import "./App.css";
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Library from "./library.js";
import Search from "./search.js";
import Review from "./review.js";
import Login from "./login.js";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
const linkStyle = {
  textDecoration: "none",
  color: "brown",
};
function App() {
  const [bool, setBool] = React.useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <li>
              {" "}
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/library" style={linkStyle}>
                Your Library
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/search" style={linkStyle}>
                Search For A Book
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/review" style={linkStyle}>
                Leave a review for a book
              </Link>
            </li>
          </nav>
        </header>

        <Switch>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
        </Switch>
      </BrowserRouter>
      <Button
        variant="contained"
        onClick={() => {
          setBool(!bool);
        }}
      >
        Login/Out
      </Button>
      {bool && <Login></Login>}
    </div>
  );
}

export default App;
