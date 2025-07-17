import { Consulta } from "../models/consulta.js";
import { Paciente } from "../models/paciente.js";
import { Diagnostico } from "../models/diagnostico.js";
import { Op } from "sequelize";

//27
export async function get_diagnosticos_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) return null;
  const diagnosticos = await consulta.getDiagnosticos();
  return diagnosticos;
}

//28
export async function get_diagnostico_by_id(id: string) {
  return await Diagnostico.findByPk(id);
}

//29
export async function get_diagnosticos_by_paciente(id_paciente: string) {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) return null;

  const consultas = await paciente.getConsultas();
  const diagnosticos: any[] = [];

  for (const consulta of consultas) {
    const t = await consulta.getDiagnosticos();
    diagnosticos.push(...t); // t es un array, usamos spread para agregar todos
  }

  return diagnosticos;
}

//30
export async function get_diagnosticos_by_paciente_and_date(
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
            model: Diagnostico,
            as: "diagnosticos",
          },
        ],
      },
    ],
  });

  if (!paciente || !("consultas" in paciente)) return null;

  const diagnosticos: any[] = [];
  for (const consulta of (paciente as any).consultas || []) {
    if ("diagnosticos" in consulta) {
      diagnosticos.push(...consulta.diagnosticos);
    }
  }

  return diagnosticos;
}

//31
export async function create_diagnostico(id_consulta: string, data: any) {
  const diagnosticos = await Diagnostico.create({
    ...data,
    date: new Date(),
    consulta_id: id_consulta,
  });
  return diagnosticos;
}

//32
export async function update_diagnostico(id: string, data: any) {
  const diagnostico = await Diagnostico.findByPk(id);
  if (!diagnostico) return null;

  await diagnostico.update(data);
  return diagnostico;
}

//33
export async function delete_diagnostico(id: string) {
  return await Diagnostico.destroy({
    where: {
      id: id,
    },
  });
}
