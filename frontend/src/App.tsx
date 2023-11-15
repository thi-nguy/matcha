import React from "react";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-400">
        Hello world!
      </h1>
      <div style={{ textDecoration: 'underline' }} onClick={() => navigate('/login')}>Go to login</div>
    </>
  );
}

export default App;
