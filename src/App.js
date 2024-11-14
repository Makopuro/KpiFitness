import React, { useState } from "react";
import AthleteForm from "./components/AthleteForm";
import MetricsChart from "./components/MetricsChart";
import Auth from "./components/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [athleteName, setAthleteName] = useState("");
  const [user, setUser] = useState(null);

  // Verificar si el usuario está autenticado
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="App">
      <header>
        <h1>Aplicación de Métricas Deportivas</h1>
      </header>
      {user ? (
        <>
          <AthleteForm />
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Nombre del atleta"
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
            />
            <MetricsChart athleteName={athleteName} />
          </div>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
