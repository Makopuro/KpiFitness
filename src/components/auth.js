import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde'
    };
    return errorMessages[errorCode] || 'Error en autenticación. Intenta nuevamente';
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // No necesitamos alert porque el usuario será redirigido automáticamente
    } catch (error) {
      console.error("Error en autenticación: ", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAuth}>
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          disabled={loading}
          className="secondary-btn"
        >
          {isLogin ? "Crear una cuenta" : "Ya tengo una cuenta"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
