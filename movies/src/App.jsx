import {Routes, Route} from "react-router-dom";
import './css/App.css';
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {

  return (
  <MovieProvider>
      <NavBar />
   <main className = "main-content">
    <Routes>
      <Route path = "/" element = {<Home />}/>
      <Route path = "/Favorites" element = {<Favorites />}/>
    </Routes>
   </main>
  </MovieProvider>
  )
}

export default App
