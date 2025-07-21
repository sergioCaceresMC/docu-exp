// renderer/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import Consultas from "./pages/Consultas";
import Diagnosticos from "./pages/Diagnosticos";
import Tratamientos from "./pages/Tratamientos";
import Controles from "./pages/Controles";
import Paciente from "./pages/Paciente";
import Laboratorios from "./pages/Laboratorios";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/laboratorios" element={<Laboratorios />} />
        <Route path="/controles" element={<Controles />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
      </Routes>
    </div>
  );
}

export default App;
