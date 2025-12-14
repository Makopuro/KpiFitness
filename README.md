# KpiFitness - Aplicación de Métricas Deportivas

Aplicación web moderna para el seguimiento y visualización de métricas de rendimiento deportivo de atletas.

## Características

- **Autenticación de usuarios** con Firebase Authentication
- **Registro completo de métricas** de levantamientos:
  - Sentadilla (Squat)
  - Press de Banca (Bench Press)
  - Peso Muerto (Deadlift)
  - Power Clean
  - Press Militar (Military Press)
  - Arranque (Snatch)
- **Visualización interactiva** mediante gráficos radar (Chart.js)
- **Base de datos en tiempo real** con Firebase Firestore
- **Diseño responsive** que se adapta a dispositivos móviles y desktop
- **Interfaz moderna** con gradientes y animaciones suaves
- **Validaciones de entrada** para garantizar datos correctos
- **Manejo de errores** con mensajes descriptivos en español

## Tecnologías Utilizadas

- **React** 18.3.1 - Framework de JavaScript
- **Firebase** 11.0.1 - Backend as a Service (Authentication + Firestore)
- **Chart.js** 4.4.6 + react-chartjs-2 - Visualización de datos
- **Create React App** - Configuración y herramientas de desarrollo

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Makopuro/KpiFitness.git
cd KpiFitness
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la aplicación en modo desarrollo:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

### `npm start`
Ejecuta la aplicación en modo desarrollo.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.

### `npm test`
Ejecuta el corredor de pruebas en modo interactivo.

### `npm run deploy`
Despliega la aplicación a GitHub Pages.

## Estructura del Proyecto

```
KpiFitness/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── Auth.js           # Autenticación (login/registro)
│   │   ├── AthleteForm.js    # Formulario de métricas
│   │   └── MetricsChart.js   # Gráfico de visualización
│   ├── styles/          # Archivos CSS
│   │   └── MetricsChart.css
│   ├── App.js           # Componente principal
│   ├── App.css          # Estilos globales
│   ├── firebase.js      # Configuración de Firebase
│   └── index.js         # Punto de entrada
└── package.json
```

## Uso

1. **Registro/Inicio de sesión**: Crea una cuenta o inicia sesión con tu email
2. **Registrar métricas**: Completa el formulario con los datos del atleta y sus levantamientos
3. **Visualizar datos**: Ingresa el nombre de un atleta para ver sus métricas en el gráfico radar
4. **Cerrar sesión**: Usa el botón "Cerrar Sesión" en el header

## Mejoras Implementadas

- Formulario completo con todos los campos de levantamiento
- Consultas optimizadas a Firestore con filtros
- Registro de componentes de Chart.js para evitar errores
- Botón de logout con información del usuario
- Validaciones de entrada (min/max/step)
- Mensajes de error descriptivos en español
- Estados de carga (loading) en operaciones asíncronas
- Diseño responsive con CSS Grid
- Gradiente de fondo moderno
- Animaciones en botones y transiciones suaves
- Limpieza automática del formulario después de guardar

## Despliegue

La aplicación está configurada para desplegarse en GitHub Pages:

```bash
npm run deploy
```

## Próximas Mejoras Sugeridas

- [ ] Historial de progreso temporal del atleta
- [ ] Comparación entre múltiples atletas
- [ ] Exportación de datos (PDF/Excel)
- [ ] Cálculo de índices de fuerza relativa (peso levantado / peso corporal)
- [ ] Dashboard con estadísticas agregadas
- [ ] Edición y eliminación de métricas existentes
- [ ] Búsqueda avanzada y filtrado de atletas
- [ ] Tests unitarios y de integración

## Licencia

Este proyecto fue creado con Create React App.
