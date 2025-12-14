import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AthleteForm = () => {
  const [formData, setFormData] = useState({
    athleteName: "",
    bodyWeight: "",
    gender: "",
    squat: "",
    benchPress: "",
    deadlift: "",
    powerClean: "",
    militaryPress: "",
    snatch: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Convertir valores numéricos
      const dataToSave = {
        ...formData,
        bodyWeight: parseFloat(formData.bodyWeight),
        squat: parseFloat(formData.squat),
        benchPress: parseFloat(formData.benchPress),
        deadlift: parseFloat(formData.deadlift),
        powerClean: parseFloat(formData.powerClean),
        militaryPress: parseFloat(formData.militaryPress),
        snatch: parseFloat(formData.snatch),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "athletes"), dataToSave);
      setMessage({ type: "success", text: "Métricas guardadas correctamente" });

      // Limpiar formulario
      setFormData({
        athleteName: "",
        bodyWeight: "",
        gender: "",
        squat: "",
        benchPress: "",
        deadlift: "",
        powerClean: "",
        militaryPress: "",
        snatch: ""
      });
    } catch (error) {
      console.error("Error al guardar los datos: ", error);
      setMessage({ type: "error", text: "Error al guardar las métricas. Intenta nuevamente" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <input
        type="text"
        name="athleteName"
        placeholder="Nombre del atleta"
        value={formData.athleteName}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="number"
        name="bodyWeight"
        placeholder="Peso Corporal (kg)"
        value={formData.bodyWeight}
        onChange={handleChange}
        required
        disabled={loading}
        min="30"
        max="300"
        step="0.1"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        disabled={loading}
      >
        <option value="" disabled>Selecciona tu género</option>
        <option value="male">Hombre</option>
        <option value="female">Mujer</option>
      </select>
      <input
        type="number"
        name="squat"
        placeholder="Sentadilla (kg)"
        value={formData.squat}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="500"
        step="0.5"
      />
      <input
        type="number"
        name="benchPress"
        placeholder="Press de Banca (kg)"
        value={formData.benchPress}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="400"
        step="0.5"
      />
      <input
        type="number"
        name="deadlift"
        placeholder="Peso Muerto (kg)"
        value={formData.deadlift}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="600"
        step="0.5"
      />
      <input
        type="number"
        name="powerClean"
        placeholder="Power Clean (kg)"
        value={formData.powerClean}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="300"
        step="0.5"
      />
      <input
        type="number"
        name="militaryPress"
        placeholder="Press Militar (kg)"
        value={formData.militaryPress}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="300"
        step="0.5"
      />
      <input
        type="number"
        name="snatch"
        placeholder="Arranque (kg)"
        value={formData.snatch}
        onChange={handleChange}
        required
        disabled={loading}
        min="0"
        max="300"
        step="0.5"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Métricas"}
      </button>
    </form>
  );
};

export default AthleteForm;
