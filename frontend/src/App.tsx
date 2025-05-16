import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./pages/NavBar";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold text-blue-400">Hello world!</h1>
      <div
        style={{ textDecoration: "underline" }}
        onClick={() => navigate("/login")}
      >
        Go to login
      </div>
    </>
  );
}

export default App;
