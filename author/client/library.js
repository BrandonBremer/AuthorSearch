import React, { useRef, useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Routes from './routes.js'
function Library () {
const [books, setBooks] =useState([]);
useEffect(() => {
const fetchData = async ()=> {
 await fetch(`/books`)
    .then((res) => res.json())
    .then((data) => setBooks(data));
    
  }
  fetchData();
}, []);
const handleSubmit = (e) => {
  
    e.preventDefault();
    fetch(`/books`)
        .then((res) => res.json())
        .then((data) => setBooks(data));
      
  }
    return (

        <div>
           <Button variant="contained" color="primary" onClick={handleSubmit}>Find Author</Button>  
          <p> this is a library: {books[0]}</p> 
          
            
            
            
            </div>
        
    )
}
export default Library;