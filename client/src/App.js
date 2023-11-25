import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Components/signup";
import Login from "./Components/Login";
import Main from "./Pages/Products_main";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
