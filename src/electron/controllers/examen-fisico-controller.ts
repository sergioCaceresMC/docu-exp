import { Consulta } from "../models/consulta.js";
import { ExamenFisico } from "../models/examen-fisico.js";

//22
export async function get_ex_fisico_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) return null;
  return await consulta.getExamenFisico();
}

//23
export async function get_ex_fisico_by_id(id: string) {
  return await ExamenFisico.findByPk(id);
}

//24
export async function create_ex_fisico_by_consulta(
  id_consulta: string,
  data: any
) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) return null;

  const examen = await consulta?.createExamenFisico(data);
  return examen;
}

//25
export async function update_ex_fisico(id: string, data: any) {
  const examen = await ExamenFisico.findByPk(id);
  if (!examen) return null;

  await examen.update(data);
  return examen;
}

//26
export async function delete_ex_fisico(id: string) {
  return await ExamenFisico.destroy({
    where: {
      id: id,
    },
  });
}
