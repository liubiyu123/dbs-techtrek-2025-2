import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Requests from "./Pages/Requests";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Landing />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/landing"
        element={<ProtectedRoute />}
      />        
      <Route path='/requests' element={<Requests />} />
    </Routes>
  );
}

export default App;
