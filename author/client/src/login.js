import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  createContext,
  Component,
} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

export const MyContext = createContext();
function Login() {
  const [data, setData] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [userInput2, setUserInput2] = React.useState("");
  const [UID, setUID] = React.useState([]);
  const [readMore, setReadMore] = React.useState(false);
  const [contextValue, setContextValue] = useState();
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };
  const handleChange2 = (e) => {
    setUserInput2(e.currentTarget.value);
  };

  const handleSubmit2 = (e) => {
    fetch(`/login/${userInput}/${userInput2}`)
      .then((res) => res.json())
      .then((data) => setUID(data));
    setUserInput("");
    setUserInput2("");
  };
  const handleSubmit3 = (e) => {
    fetch(`/logout/${userInput}/${userInput2}`)
      .then((res) => res.json())
      .then((data) => setUID(data));
    setUserInput("");
    setUserInput2("");
  };
  return (
    <div className="App">
      <form>
        <Input
          value={userInput}
          color="secondary"
          type="text"
          onChange={handleChange}
          placeholder="Username"
        />
        <Input
          value={userInput2}
          color="secondary"
          type="text"
          onChange={handleChange2}
          placeholder="Password"
        />
      </form>
      <Button variant="contained" onClick={handleSubmit2}>
        Login
      </Button>
      <Button variant="contained" onClick={handleSubmit3}>
        Log Out
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        Make a new account
      </Button>
      );
    </div>
  );
}

export default Login;
