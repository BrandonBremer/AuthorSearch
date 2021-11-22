import "./App.css";
import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Library from "./library.js";
import Search from "./search.js";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
const linkStyle = {
  textDecoration: "none",
  color: "brown",
};
function App() {
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
          </nav>
        </header>
        <Switch>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
