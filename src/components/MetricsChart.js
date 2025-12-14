import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import "../styles/MetricsChart.css";

// Registrar los componentes de Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const MetricsChart = ({ athleteName }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!athleteName) {
        setChartData(null);
        return;
      }

      try {
        // Consulta optimizada con filtro en lugar de descargar todos los datos
        const q = query(
          collection(db, "athletes"),
          where("athleteName", "==", athleteName)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const athleteData = querySnapshot.docs[0].data();
          setChartData({
            labels: ["Sentadilla", "Press de Banca", "Peso Muerto", "Power Clean", "Press Militar", "Arranque"],
            datasets: [
              {
                label: "Métricas del Atleta",
                data: [
                  athleteData.squat || 0,
                  athleteData.benchPress || 0,
                  athleteData.deadlift || 0,
                  athleteData.powerClean || 0,
                  athleteData.militaryPress || 0,
                  athleteData.snatch || 0
                ],
                backgroundColor: "rgba(16, 163, 127, 0.5)",
                borderColor: "rgba(16, 163, 127, 1)",
                borderWidth: 2
              }
            ]
          });
        } else {
          setChartData(null);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setChartData(null);
      }
    };

    fetchData();
  }, [athleteName]);

  if (!athleteName) {
    return <p className="chart-message">Ingresa un nombre de atleta para ver sus métricas</p>;
  }

  if (!chartData) {
    return <p className="chart-message">No se encontraron datos para este atleta</p>;
  }

  return (
    <div className="chart-container">
      <Radar data={chartData} options={{
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }} />
    </div>
  );
};

export default MetricsChart;
