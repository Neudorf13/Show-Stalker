import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import { useState, useEffect } from 'react'

//page imports
import Login from './pages/Login';
import Home from './pages/Home';
import MyShows from './pages/MyShows';
import About from './pages/About';
import SearchResults from './pages/SearchResults';
import ShowDetails from './pages/ShowDetails';

import './App.css'
// import axios from "axios";

function App() {
  // const [count, setCount] = useState(0)
  // const [array, setArray] = useState([]);

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:8080/api");
  //   setArray(response.data.fruits);
  //   console.log(response.data.fruits);
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/myShows' element={<MyShows/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/searchResults' element={<SearchResults/>}></Route>
          <Route path='/showDetails/:showName' element={<ShowDetails/>}></Route>
        </Routes>
      </BrowserRouter>
          
    </>
  )
}

export default App
