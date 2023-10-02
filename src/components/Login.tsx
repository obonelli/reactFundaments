import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importa el archivo CSS

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid = () => {
    return email.includes("@") && password.length >= 7 && isChecked;
  };

  const handleLogin = async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.success) {
        const guestSessionId = response.data.guest_session_id;
        console.log("Token de sesión de invitado obtenido:", guestSessionId);
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Error al obtener el token de sesión de invitado:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {/* Aquí podrías poner tu imagen o logo */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Aquí podrías poner un ícono para el email */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Aquí podrías poner un ícono para la contraseña */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label>Acepto los términos y condiciones</label>
      <button disabled={!isFormValid()} onClick={handleLogin}>
        Crear cuenta
      </button>
    </div>
  );
};

export default Login;
