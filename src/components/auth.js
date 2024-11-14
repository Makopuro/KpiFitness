import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Iniciar sesión con correo electrónico y contraseña
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
      } else {
        // Registrar un nuevo usuario con correo electrónico y contraseña
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registro exitoso");
      }
    } catch (error) {
      console.error("Error en autenticación: ", error);
      alert("Error en autenticación. Revisa tus credenciales.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAuth}>
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Iniciar Sesión" : "Registrarse"}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Crear una cuenta" : "Ya tengo una cuenta"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
