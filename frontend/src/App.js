import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Requests from "./Pages/Requests";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/requests' element={<Requests />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
