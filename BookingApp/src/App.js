import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/home";
import List from "./Pages/List/List";
import Hotel from "./Pages/Hotel/hotel";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/hotel" element={<List />}></Route>
          <Route exact path="/hotel/:id" element={<Hotel />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
