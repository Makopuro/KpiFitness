// Vamos a revisar y mejorar el código de React que posiblemente esté causando problemas
// en la aplicación y también mejorar la separación de los botones para que sea más estético.

import React, { useState, useEffect } from "react";
import AthleteForm from "./components/AthleteForm";
import MetricsChart from "./components/MetricsChart";
import Auth from "./components/auth";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./app.css"; // Importa una hoja de estilos para los estilos generales

function App() {
  const [athleteName, setAthleteName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Añadimos un estado de loading

  useEffect(() => {
    // useEffect para verificar si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Una vez autenticado, el estado de loading se cambia a false
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAthleteName(""); // Limpiar el nombre del atleta al cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    // Mostrar un mensaje de carga mientras se verifica el estado del usuario
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>Aplicación de Métricas Deportivas</h1>
        {user && (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>
      {user ? (
        <div className="main-content">
          <section className="form-section">
            <h2>Registrar Métricas</h2>
            <AthleteForm />
          </section>
          <section className="chart-section">
            <h2>Visualizar Métricas</h2>
            <input
              type="text"
              placeholder="Nombre del atleta"
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              className="athlete-input"
            />
            <MetricsChart athleteName={athleteName} />
          </section>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;