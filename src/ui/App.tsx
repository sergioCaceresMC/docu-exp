// renderer/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/principales/home";
import Consultas from "./pages/principales/Consultas";
import Diagnosticos from "./pages/principales/Diagnosticos";
import Tratamientos from "./pages/principales/Tratamientos";
import Controles from "./pages/principales/Controles";
import Paciente from "./pages/principales/Paciente";
import Laboratorios from "./pages/principales/Laboratorios";
import ConsultaViewPage from "./pages/vistas/ConsultaViewPage";
import LaboratorioViewPage from "./pages/vistas/LaboratorioViewPage";
import { DataBase } from "./pages/principales/database";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<DataBase />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consultas/:id" element={<ConsultaViewPage />} />
        <Route path="/consultas/new" element={<Consultas />} />
        <Route path="/laboratorios" element={<Laboratorios />} />
        <Route path="/laboratorios/:id" element={<LaboratorioViewPage />} />
        <Route path="/controles" element={<Controles />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
      </Routes>
    </div>
  );
}

export default App;
