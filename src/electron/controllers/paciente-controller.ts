import { Paciente } from "../models/paciente.js";
import { Op } from "sequelize";

//1 obtener paciente por id
export async function get_paciente(id: string) {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) throw new Error("Paciente not found");
  return paciente;
}

//2 obtener todos los pacientes
export async function get_pacientes() {
  return await Paciente.findAll();
}

//3 obtener todos los pacientes entre dos fechas
export async function get_pacientes_by_birthday(from: Date, to: Date) {
  return Paciente.findAll({
    where: {
      birthday: {
        [Op.gt]: from,
        [Op.lt]: to,
      },
    },
    order: [["birthday", "ASC"]],
  });
}

//4 Crear paciente
export async function create_paciente(data: any) {
  return await Paciente.create({
    name: data.name,
    birthday: data.birthday,
    dui: data.dui,
    gender: data.gender,
    phone: data.phone,
    adderess: data.adderess,
  });
}

//5 Borrar paciente
export async function delete_paciente_by_id(id: string) {
  return await Paciente.destroy({
    where: {
      id: id,
    },
  });
}

//6 Actualizar paciente
export async function update_paciente_by_id(id: string, data: any) {
  let paciente = await Paciente.findByPk(id);
  if (!paciente) return null;
  return await paciente.update(data);
  /*{
    name: data.name,
    birthday: data.birthday,
    dui: data.dui,
    gender: data.gender,
    phone: data.phone,
    direction: data.direction,
  });*/
}
