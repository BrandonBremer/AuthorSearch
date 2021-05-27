
import './App.css';
import React from "react";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
function App() {
  const [data, setData] = React.useState("");
  const [title, setTitle] = React.useState("Things Fall Apart");
  const [ userInput, setUserInput ] = React.useState('');
  React.useEffect(() => {
  const fetchData = async ()=> {
   await fetch(`/search/${title}`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
    }
    fetchData();
  }, []);


  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
}
 
const handleSubmit = (e) => {
  e.preventDefault();
  
  setTitle(userInput); 
  fetch(`/search/${title}`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
    
 // setUserInput("");
}
  return (
    <div className="App">
     
      <form onSubmit={handleSubmit} >
            <Input value={userInput} color="secondary" type="text" onChange={handleChange} placeholder="Enter a book title!"/>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Find Author</Button>
            
        </form>
        <div>The Author of {title} is: {data}</div>

    </div>
  );
}

export default App;
