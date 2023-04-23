import './App.css'

import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';

import Landing from "./Components/Landing/Landing";
import About from "../src/Components/About us/About"
import Nav from "./Components/Nav/Nav";
import Home from './Components/Home/Home';
import Details from './Components/Home/Details/Details';
import Form from './Components/Form/Form';
import Search from './Components/Home/Search/Search';

import store from "../src/Redux/Store";


function App() {

  const location = useLocation();
  
  return (
      <>
      <Provider store = {store}>
        
        {
          location.pathname !== "/" ? <Nav/> : ("")
        }

        <Routes>
          <Route path = "/" element = {<Landing/>}></Route>
          <Route path = "/home" element = {<Home/>}></Route>
          <Route path = "/dogs" element = {<Search/>}></Route>
          <Route path = "/detail/:id" element = {<Details/>}></Route>
          <Route path = "/about" element = {<About/>}></Route>
          <Route path = "/form" element = {<Form/>}></Route>
        </Routes>

      </Provider>
        
      </>
  )
}

export default App
