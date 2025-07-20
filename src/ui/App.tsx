// renderer/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import Consultas from "./pages/Consultas";
import Diagnosticos from "./pages/Diagnosticos";
import Tratamientos from "./pages/Tratamientos";
import Antecedentes from "./pages/Antecedentes";
import Controles from "./pages/Controles";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paciente" element={<Home />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/controles" element={<Controles />} />
        <Route path="/antecedentes" element={<Antecedentes />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
      </Routes>
    </div>
  );
}

export default App;
