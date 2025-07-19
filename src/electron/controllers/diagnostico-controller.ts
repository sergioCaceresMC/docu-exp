import { Consulta } from "../models/consulta.js";
import { Paciente } from "../models/paciente.js";
import { Diagnostico } from "../models/diagnostico.js";
import { Op } from "sequelize";

//27
export async function get_diagnosticos_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) throw new Error("Consulta not found");
  const diagnosticos = await Diagnostico.findAll({
    where: {
      //@ts-ignore
      consultaId: consulta.id,
    },
    order: [["date", "ASC"]],
  });
  return diagnosticos;
}

//28
export async function get_diagnostico_by_id(id: string) {
  const diagnostico = await Diagnostico.findByPk(id);
  if (!diagnostico) throw new Error("Consulta not found");
  return diagnostico;
}

//29
export async function get_diagnosticos_by_paciente(id_paciente: string) {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) throw new Error("Paciente not found");

  const consultas = await Consulta.findAll({
    where: {
      //@ts-ignore
      pacienteId: paciente.id,
    },
    order: [["date", "ASC"]],
  });
  const diagnosticos: any[] = [];

  for (const consulta of consultas) {
    const t = await Diagnostico.findAll({
      where: {
        //@ts-ignore
        consultaId: consulta.id,
      },
      order: [["date", "ASC"]],
    });
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
          date: {
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

  //if (!paciente || !("consultas" in paciente))
  //  throw new Error("Consultas or Paciente not found");

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
  if (!diagnostico) throw new Error("Diagnostico not found");

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
