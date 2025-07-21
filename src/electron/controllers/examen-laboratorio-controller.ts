import { Laboratorio, Archivo } from "../models/examen-laboratorio.js";
import { Op } from "sequelize";

//14
export async function get_laboratorio_by_id(id: string) {
  const laboratorio = await Laboratorio.findByPk(id, {
    include: [{ model: Archivo, as: "archivos" }],
  });
  if (!laboratorio) throw new Error("Paciente not found");
  return laboratorio;
}

//15
export async function get_laboratorios_by_paciente(id_paciente: string) {
  return await Laboratorio.findAll({
    where: { pacienteId: id_paciente },
    include: [{ model: Archivo, as: "archivos" }],
    order: [["date", "ASC"]],
  });
}

//15
export async function get_laboratorios_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Laboratorio.findAll({
    where: {
      pacienteId: id_paciente,
      date: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
    include: [{ model: Archivo, as: "archivos" }],
    order: [["date", "ASC"]],
  });
}

//16
export async function create_laboratorio_by_pacient(
  id_paciente: string,
  data: any
) {
  return await Laboratorio.create({ ...data, pacienteId: id_paciente });
}

//17
export async function update_laboratorio(id: string, data: any) {
  return await Laboratorio.update(data, {
    where: { id },
  });
}

//18
export async function delete_laboratorio(id: string) {
  return await Laboratorio.destroy({ where: { id } });
}

//19
export async function create_file_by_laboratorio(
  id_laboratorio: string,
  data: any
) {
  return await Archivo.create({ ...data, laboratorioId: id_laboratorio });
}

//20
export async function update_file(id: string, data: any) {
  return await Archivo.update(data, {
    where: { id },
  });
}

//21
export async function delete_file(id: string) {
  return await Archivo.destroy({ where: { id } });
}
