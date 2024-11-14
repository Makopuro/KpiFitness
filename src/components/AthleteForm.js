import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./../styles/AthleteForm.css";


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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "athletes"), formData);
      alert("Métricas guardadas correctamente");
    } catch (error) {
      console.error("Error al guardar los datos: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="athleteName"
        placeholder="Nombre del atleta"
        value={formData.athleteName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="bodyWeight"
        placeholder="Peso Corporal (kg)"
        value={formData.bodyWeight}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
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
      />
      <input
        type="number"
        name="benchPress"
        placeholder="Press de Banca (kg)"
        value={formData.benchPress}
        onChange={handleChange}
        required
      />
      {/* Otros campos para deadlift, powerClean, etc. */}
      <button type="submit">Guardar Métricas</button>
    </form>
  );
};

export default AthleteForm;
