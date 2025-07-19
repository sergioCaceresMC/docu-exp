import { Consulta } from "../models/consulta.js";
import { ExamenFisico } from "../models/examen-fisico.js";

//22
export async function get_ex_fisico_by_consulta(id_consulta: string) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) throw new Error("Consulta not found");
  return await ExamenFisico.findOne({
    where: {
      //@ts-ignore
      consultaId: consulta.id,
    },
  });
}

//23
export async function get_ex_fisico_by_id(id: string) {
  const examen = await ExamenFisico.findByPk(id);
  if (!examen) throw new Error("Examen not found");
  return examen;
}

//24
export async function create_ex_fisico_by_consulta(
  id_consulta: string,
  data: any
) {
  const consulta = await Consulta.findByPk(id_consulta);
  if (!consulta) throw new Error("Consulta not found");

  const examen = await consulta?.createExamenFisico(data);
  return examen;
}

//25
export async function update_ex_fisico(id: string, data: any) {
  const examen = await ExamenFisico.findByPk(id);
  if (!examen) throw new Error("Examen not found");

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
