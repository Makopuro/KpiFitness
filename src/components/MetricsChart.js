import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./../styles/MetricsChart.css";

const MetricsChart = ({ athleteName }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "athletes"));
      const athleteData = querySnapshot.docs
        .map((doc) => doc.data())
        .find((data) => data.athleteName === athleteName);

      if (athleteData) {
        setChartData({
          labels: ["Sentadilla", "Press de Banca", "Peso Muerto", "Power Clean", "Press Militar", "Arranque"],
          datasets: [
            {
              label: "Métricas del Atleta",
              data: [
                athleteData.squat,
                athleteData.benchPress,
                athleteData.deadlift,
                athleteData.powerClean,
                athleteData.militaryPress,
                athleteData.snatch
              ],
              backgroundColor: "rgba(16, 163, 127, 0.5)",
              borderColor: "rgba(16, 163, 127, 1)"
            }
          ]
        });
      }
    };

    fetchData();
  }, [athleteName]);

  if (!chartData) return <p>Cargando datos...</p>;

  return <Radar data={chartData} />;
};

export default MetricsChart;
