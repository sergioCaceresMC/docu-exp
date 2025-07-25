import { Paciente } from "../models/paciente.js";
import { Consulta } from "../models/consulta.js";
import { Op } from "sequelize";
import { Console } from "console";
import { create_ex_fisico_by_consulta } from "./examen-fisico-controller.js";

export async function get_consulta_by_id(id: string) {
  const consulta = await Consulta.findByPk(id);
  if (!consulta) throw new Error("Consulta not found");
  return consulta;
}

//34 obtener todas las consultas de un paciente
export async function get_consultas_by_paciente(id_paciente: string) {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) throw new Error("Paciente not found");
  return await Consulta.findAll({
    where: {
      //@ts-ignore
      pacienteId: paciente.id,
    },
    order: [["date", "ASC"]],
  });
}

//35 obtener las consultas por paciente y un rango de fechas
export async function get_consultas_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Consulta.findAll({
    where: {
      pacienteId: id_paciente,
      type: "consulta",
      date: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
    order: [["date", "ASC"]],
  });
}

//36 obtener controles por consulta
export async function get_controles_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) throw new Error("Consulta not found");
  console.log(consulta.dataValues);
  return await Consulta.findAll({
    where: {
      //@ts-ignore
      parentConsultaId: consulta.id,
    },
    order: [["date", "ASC"]],
  });
}

//37 obtener constroles por paciente y un rango de fechas
export async function get_controles_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Consulta.findAll({
    where: {
      pacienteId: id_paciente,
      type: "control",
      date: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
    order: [["date", "ASC"]],
  });
}

//38 obtener controles por consulta y un rango de fechas
export async function get_controles_by_consulta_and_date(
  id_consulta: string,
  from: Date,
  to: Date
) {
  return await Consulta.findAll({
    where: {
      pacienteId: id_consulta,
      type: "control",
      date: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
    order: [["date", "ASC"]],
  });
}

//68 Crear consulta
export async function create_consulta_by_paciente(
  id_paciente: string,
  data: any
) {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) throw new Error("Paciente not found");

  const new_consulta = Consulta.build({
    reason: data.reason,
    type: "consulta",
    content: data.content,
    date: data.date,
    pacienteId: id_paciente,
  });

  const consulta = await new_consulta.save();

  //@ts-ignore
  const examen = await create_ex_fisico_by_consulta(consulta.id, {
    arterialPressure: null,
    cardiacFrecuency: null,
    respiratorRate: null,
    temperature: null,
    weight: null,
    height: null,
    abdominalcircunference: null,
    oxygensaturation: null,
  });

  return consulta;
}

//71
export async function create_control_by_consulta(
  id_consulta: string,
  data: any
) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) throw new Error("Consulta not found");

  //return await consulta?.addControl(new_control);

  const new_control = Consulta.build({
    reason: data.reason,
    type: "control",
    content: data.content,
    date: data.date,
    parentConsultaId: id_consulta,
    //@ts-ignore
    pacienteId: consulta.pacienteId,
  });

  const control = await new_control.save();

  //@ts-ignore
  const examen = await create_ex_fisico_by_consulta(control.id, {
    arterialPressure: null,
    cardiacFrecuency: null,
    respiratorRate: null,
    temperature: null,
    weight: null,
    height: null,
    abdominalcircunference: null,
    oxygensaturation: null,
  });

  return control;
}

//69 Actualizar consulta
export async function update_consulta_by_id(id: string, data: any) {
  let consulta = await Consulta.findByPk(id);
  if (!consulta) throw new Error("Paciente not found");
  return await consulta.update(data);
}

//70 Borrar consulta
export async function delete_consulta_by_id(id: string) {
  return await Consulta.destroy({
    where: { id: id },
  });
}
