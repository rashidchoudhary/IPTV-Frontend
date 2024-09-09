import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Login from "./Pages/Login.jsx"
import Home from "./Home/Home.jsx";
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
      <Route path="/series" element={<Home />} />
      <Route path="/season" element={<Home />} />
      <Route path="/episode" element={<Home />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;