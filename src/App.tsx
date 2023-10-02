import React, { useState } from "react";
import Login from "./components/Login";
import PopularMovies from "./components/PopularMovies";
import "./App.css";
import logoutIcon from "./logout.png"; // Asegúrate de que la ruta sea correcta

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">Dacodes</div>
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
          </button>
        )}
      </header>

      {isLoggedIn ? (
        <div className="PopularMovies-container">
          <PopularMovies />
        </div>
      ) : (
        <div className="Login-container">
          <Login onLoginSuccess={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
