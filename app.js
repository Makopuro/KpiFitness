// Obtener referencias a los elementos del DOM
const athleteForm = document.getElementById('athleteForm');
const metricsCanvas = document.getElementById('metricsChart');
const metricsChart = metricsCanvas.getContext('2d');

// Variables globales
let advancedStandards; // Para usar los valores en diferentes funciones
let athletePercentages; // Para acceder desde pointLabels

// Función para manejar el envío del formulario
athleteForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores ingresados por el usuario
  const athleteName = document.getElementById('athleteName').value;
  const squat = parseFloat(document.getElementById('squat').value);
  const benchPress = parseFloat(document.getElementById('benchPress').value);
  const deadlift = parseFloat(document.getElementById('deadlift').value);
  const powerClean = parseFloat(document.getElementById('powerClean').value);
  const militaryPress = parseFloat(document.getElementById('militaryPress').value);
  const snatch = parseFloat(document.getElementById('snatch').value);
  const bodyWeight = parseFloat(document.getElementById('bodyWeight').value);
  const gender = document.getElementById('gender').value;

  // Verificar que bodyWeight es un número válido
  if (isNaN(bodyWeight) || bodyWeight <= 0) {
    alert('Por favor, ingresa un peso corporal válido.');
    return;
  }

  // Obtener los estándares avanzados según el género y el peso corporal
  advancedStandards = getAdvancedStandards(gender, bodyWeight);

  // Calcular los porcentajes del atleta respecto a los estándares avanzados
  athletePercentages = {
    squat: (squat / (advancedStandards.squat * bodyWeight)) * 100,
    benchPress: (benchPress / (advancedStandards.benchPress * bodyWeight)) * 100,
    deadlift: (deadlift / (advancedStandards.deadlift * bodyWeight)) * 100,
    powerClean: (powerClean / (advancedStandards.powerClean * bodyWeight)) * 100,
    militaryPress: (militaryPress / (advancedStandards.militaryPress * bodyWeight)) * 100,
    snatch: (snatch / (advancedStandards.snatch * bodyWeight)) * 100
  };

  // Limitar los porcentajes al 100%
  for (let key in athletePercentages) {
    if (athletePercentages[key] > 100) athletePercentages[key] = 100;
  }

  // Crear el gráfico y pasar bodyWeight como parámetro
  createChart(athletePercentages, athleteName, bodyWeight);
});

// Función para obtener los estándares avanzados según el género y peso corporal
function getAdvancedStandards(gender, bodyWeight) {
  if (gender === 'male') {
    return {
      squat: 2.0,          // 2 x peso corporal
      benchPress: 1.5,     // 1.5 x peso corporal
      deadlift: 2.5,       // 2.5 x peso corporal
      powerClean: 1.5,     // 1.5 x peso corporal
      militaryPress: 1.0,  // 1 x peso corporal
      snatch: 1.2          // 1.2 x peso corporal
    };
  } else {
    return {
      squat: 1.5,          // 1.5 x peso corporal
      benchPress: 1.0,     // 1 x peso corporal
      deadlift: 2.0,       // 2 x peso corporal
      powerClean: 1.0,     // 1 x peso corporal
      militaryPress: 0.7,  // 0.7 x peso corporal
      snatch: 0.8          // 0.8 x peso corporal
    };
  }
}

// Función para crear el gráfico
function createChart(athletePercentages, athleteName, bodyWeight) {
  // Destruir el gráfico anterior si existe
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Datos para el gráfico
  const data = {
    labels: [
      `Sentadilla\n(${(advancedStandards.squat * bodyWeight).toFixed(1)} kg)`,
      `Press de Banca\n(${(advancedStandards.benchPress * bodyWeight).toFixed(1)} kg)`,
      `Peso Muerto\n(${(advancedStandards.deadlift * bodyWeight).toFixed(1)} kg)`,
      `Power Clean\n(${(advancedStandards.powerClean * bodyWeight).toFixed(1)} kg)`,
      `Press Militar\n(${(advancedStandards.militaryPress * bodyWeight).toFixed(1)} kg)`,
      `Arranque\n(${(advancedStandards.snatch * bodyWeight).toFixed(1)} kg)`
    ],
    datasets: [
      {
        label: '',
        data: [
          athletePercentages.squat,
          athletePercentages.benchPress,
          athletePercentages.deadlift,
          athletePercentages.powerClean,
          athletePercentages.militaryPress,
          athletePercentages.snatch
        ],
        backgroundColor: 'rgba(16, 163, 127, 0.5)',
        borderColor: 'rgba(16, 163, 127, 1)',
        borderWidth: 2,
        fill: true
      }
    ]
  };

  // Configuración del gráfico
  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false, // Ocultar las etiquetas de porcentaje en los steps
            stepSize: 20,
            color: '#666666'
          },
          grid: {
            color: '#aaaaaa'
          },
          angleLines: {
            color: '#aaaaaa'
          },
          pointLabels: {
            callback: function(label, index) {
              return label.split('\n');
            },
            font: {
              size: 12
            },
            color: function(context) {
              // Determinar el color basado en el porcentaje
              const percentage = athletePercentages[Object.keys(athletePercentages)[context.index]];
              if (percentage < 50) {
                return 'orange';
              } else if (percentage >= 50 && percentage <= 75) {
                return 'blue';
              } else {
                return 'green';
              }
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: `Stats de ${athleteName}`,
          font: {
            size: 18
          },
          color: '#333333',
          padding: {
            bottom: 10
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.formattedValue + '%';
            }
          }
        }
      },
      layout: {
        padding: {
          top: 30,
          bottom: 30,
          left: 30,
          right: 30
        }
      }
    }
  };

  // Crear y renderizar el gráfico
  window.myChart = new Chart(metricsCanvas, config);
}
