import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./Pages/Login.jsx"
import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";

function App() {
  React.useEffect(() => {
		if (!localStorage.getItem("users")) {
			localStorage.setItem("users", JSON.stringify([]));
		}
	});
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;