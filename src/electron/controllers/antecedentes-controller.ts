import { Paciente } from "../models/paciente.js";
import {
  Vacuna,
  Alergia,
  Familiar,
  Enfermedad,
  Cirugia,
} from "../models/antecedentes.js";
import { Op, where } from "sequelize";

//===============================================Vacunas
//39
export async function get_vacuna_by_id(id: string) {
  const vacuna = await Vacuna.findByPk(id);
  if (!vacuna) throw new Error("Vacuna not found");
  return vacuna;
}

//40
export async function get_vacunas_paciente(id_paciente: string) {
  return await Vacuna.findAll({ where: { pacienteId: id_paciente } });
}

//41
export async function get_vacunas_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Vacuna.findAll({
    where: {
      pacienteId: id_paciente,
      date: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
  });
}

//42
export async function create_vacuna(id_paciente: string, data: any) {
  return await Vacuna.create({ ...data, pacienteId: id_paciente });
}

//43
export async function update_vacuna_by_id(id: string, data: any) {
  return await Vacuna.update(data, { where: { id } });
}

//44
export async function delete_vacuna_by_id(id: string) {
  return await Vacuna.destroy({ where: { id } });
}

//===============================================Alergia
//45
export async function get_alergia_by_id(id: string) {
  const alergia = await Alergia.findByPk(id);
  if (!alergia) throw new Error("Alergia not found");
  return alergia;
}

//46
export async function get_alergias_by_paciente(id_paciente: string) {
  return await Alergia.findAll({ where: { pacienteId: id_paciente } });
}

//47
export async function get_alergias_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Alergia.findAll({
    where: {
      pacienteId: id_paciente,
      date: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
  });
}

//48
export async function create_alergia(id_paciente: string, data: any) {
  return await Alergia.create({
    ...data,
    date: new Date(),
    pacienteId: id_paciente,
  });
}

//49
export async function update_alergia_by_id(id: string, data: any) {
  return await Alergia.update(data, { where: { id } });
}

//50
export async function delete_alergia_by_id(id: string) {
  return await Alergia.destroy({ where: { id } });
}

//===============================================Enfermedad
//51
export async function get_enfermedad_by_id(id: string) {
  const enfermedad = await Enfermedad.findByPk(id, {
    include: [{ model: Familiar, attributes: ["name"] }],
  });
  if (!enfermedad) throw new Error("Enfermedad not found");
  return enfermedad;
}

//52
export async function get_enfermedades_paciente(id_paciente: string) {
  return await Enfermedad.findAll({
    where: { pacienteId: id_paciente },
    include: [{ model: Familiar, attributes: ["name"] }],
  });
}

//53
export async function get_enfermedades_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Enfermedad.findAll({
    where: {
      pacienteId: id_paciente,
      date: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
    include: [{ model: Familiar, attributes: ["name"] }],
  });
}

//54
export async function create_enfermedad(id_paciente: string, data: any) {
  return await Enfermedad.create({ ...data, pacienteId: id_paciente });
}

//55
export async function update_enfermedad_by_id(id: string, data: any) {
  return await Enfermedad.update(data, { where: { id } });
}

//56
export async function delete_enfermedad_by_id(id: string) {
  return await Enfermedad.destroy({ where: { id } });
}

//===============================================Familiar
//57
export async function get_familiar_by_id(id: string) {
  const familiar = await Familiar.findByPk(id);
  if (!familiar) throw new Error("Familiar not found");
  return familiar;
}

//58
//export async function get_familiar_by_enfermedad(id_enfermedad: string) {}

//59
export async function create_familiar(data: any) {
  return await Familiar.create(data);
}

//60
export async function update_familiar_by_id(id: string, data: any) {
  return await Familiar.update(data, {
    where: {
      id: id,
    },
  });
}

//61
export async function delete_familiar_by_id(id: string) {
  return await Familiar.destroy({ where: { id: id } });
}

//===============================================Cirugía
//62
export async function get_cirugia_by_id(id: string) {
  const cirugia = await Cirugia.findByPk(id);
  if (!cirugia) throw new Error("Cirugia not found");
  return cirugia;
}

//63
export async function get_cirugias_paciente(id_paciente: string) {
  return await Cirugia.findAll({ where: { pacienteId: id_paciente } });
}

//64
export async function get_cirugias_by_paciente_and_date(
  id_paciente: string,
  from: Date,
  to: Date
) {
  return await Cirugia.findAll({
    where: {
      pacienteId: id_paciente,
      date: {
        [Op.gte]: from,
        [Op.lte]: to,
      },
    },
  });
}

//65
export async function create_cirugia(id_paciente: string, data: any) {
  return await Cirugia.create({ ...data, pacienteId: id_paciente });
}

//66
export async function update_cirugia_by_id(id: string, data: any) {
  return await Cirugia.update(data, { where: { id } });
}

//67
export async function delete_cirugia_by_id(id: string) {
  return await Cirugia.destroy({ where: { id } });
}
