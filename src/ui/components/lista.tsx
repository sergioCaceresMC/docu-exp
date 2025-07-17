import React, { useEffect, useState } from "react";

type Paciente = {
  id: string;
  name: string;
  birthday: string;
  gender: string;
  dui: string;
  phone: string;
  address: string;
};

const PacientesList: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        // @ts-ignore
        const data = await window.electron.obtenerPacientes();
        if (data) setPacientes(data);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPacientes();
  }, []);

  if (loading) return <p>Cargando pacientes...</p>;

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Lista de Pacientes</h2>
      {pacientes.length === 0 ? (
        <p>No hay pacientes registrados.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Género</th>
              <th>DUI</th>
              <th>Fecha de nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.name}</td>
                <td>{paciente.phone}</td>
                <td>{paciente.address}</td>
                <td>{paciente.gender}</td>
                <td>{paciente.dui}</td>
                <td>{new Date(paciente.birthday).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PacientesList;
