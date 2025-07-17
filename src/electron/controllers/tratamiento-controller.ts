import { Consulta } from "../models/consulta.js";
import { Paciente } from "../models/paciente.js";
import { Tratamiento } from "../models/tratamiento.js";
import { Op } from "sequelize";

//7
export async function get_tratamientos_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) return null;
  const tratamientos = await consulta.getTratamientos();
  return tratamientos;
}

//8
export async function get_tratamiento_by_id(id: string) {
  return await Tratamiento.findByPk(id);
}

//9
export async function get_tratamientos_by_paciente(id_paciente: string) {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) return null;

  const consultas = await paciente.getConsultas();
  const tratamientos: any[] = [];

  for (const consulta of consultas) {
    const t = await consulta.getTratamientos();
    tratamientos.push(...t); // t es un array, usamos spread para agregar todos
  }

  return tratamientos;
}

//10
export async function get_tratamientos_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  const paciente = await Paciente.findByPk(id_paciente, {
    include: [
      {
        model: Consulta,
        as: "consultas",
        where: {
          fecha: {
            [Op.gte]: from,
            [Op.lte]: to,
          },
        },
        include: [
          {
            model: Tratamiento,
            as: "tratamientos",
          },
        ],
      },
    ],
  });

  if (!paciente || !("consultas" in paciente)) return null;

  const tratamientos: any[] = [];
  for (const consulta of (paciente as any).consultas || []) {
    if ("tratamientos" in consulta) {
      tratamientos.push(...consulta.tratamientos);
    }
  }

  return tratamientos;
}

//11
export async function create_tratamiento(id_consulta: string, data: any) {
  const tratamiento = await Tratamiento.create({
    ...data,
    date: new Date(),
    consulta_id: id_consulta,
  });
  return tratamiento;
}

//12
export async function update_tratamiento(id: string, data: any) {
  const tratamiento = await Tratamiento.findByPk(id);
  if (!tratamiento) return null;

  await tratamiento.update(data);
  return tratamiento;
}

//13
export async function delete_tratamiento(id: string) {
  return await Tratamiento.destroy({
    where: {
      id: id,
    },
  });
}
