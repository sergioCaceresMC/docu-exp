import { Paciente } from "./paciente.js";
import { Consulta } from "./consulta.js";
import { ExamenFisico } from "./examen-fisico.js";
import { Laboratorio, Archivo } from "./examen-laboratorio.js";
import {
  Vacuna,
  Alergia,
  Familiar,
  Enfermedad,
  Cirugia,
} from "./antecedentes.js";
import { Diagnostico } from "./diagnostico.js";
import { Tratamiento } from "./tratamiento.js";

export function make_relations() {
  // Consulta 1:N consigo misma (controles médicos)
  Consulta.hasMany(Consulta, {
    foreignKey: "parentConsultaId",
    as: "controls",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Consulta.belongsTo(Consulta, {
    foreignKey: "parentConsultaId",
    as: "parentConsulta",
  });

  // Paciente 1:N Consulta
  Paciente.hasMany(Consulta, {
    foreignKey: "pacienteId",
    as: "consultas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Consulta.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });

  // Consulta 1:N Tratamiento
  Consulta.hasMany(Tratamiento, {
    foreignKey: "consultaId",
    as: "tratamientos",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Tratamiento.belongsTo(Consulta, {
    foreignKey: "consultaId",
    as: "consulta",
  });

  // Consulta 1:1 Examen Físico
  Consulta.hasOne(ExamenFisico, {
    foreignKey: "consultaId",
    as: "examenFisico",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  ExamenFisico.belongsTo(Consulta, {
    foreignKey: "consultaId",
    as: "consulta",
  });

  // Laboratorio 1:N Archivo
  Laboratorio.hasMany(Archivo, {
    foreignKey: "laboratorioId",
    as: "archivos",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Archivo.belongsTo(Laboratorio, {
    foreignKey: "laboratorioId",
    as: "laboratorio",
  });

  // Paciente 1:N Laboratorio
  Paciente.hasMany(Laboratorio, {
    foreignKey: "pacienteId",
    as: "laboratorios",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Laboratorio.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });

  // Consulta 1:N Diagnóstico
  Consulta.hasMany(Diagnostico, {
    foreignKey: "consultaId",
    as: "diagnosticos",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Diagnostico.belongsTo(Consulta, {
    foreignKey: "consultaId",
    as: "consulta",
  });

  // Familiar 1:N Enfermedad
  Familiar.hasMany(Enfermedad, {
    foreignKey: "familiarId",
    as: "enfermedades",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });
  Enfermedad.belongsTo(Familiar, {
    foreignKey: "familiarId",
    as: "familiar",
  });

  // Paciente 1:N Vacuna
  Paciente.hasMany(Vacuna, {
    foreignKey: "pacienteId",
    as: "vacunas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Vacuna.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });

  // Paciente 1:N Cirugia
  Paciente.hasMany(Cirugia, {
    foreignKey: "pacienteId",
    as: "cirugias",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Cirugia.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });

  // Paciente 1:N Enfermedad
  Paciente.hasMany(Enfermedad, {
    foreignKey: "pacienteId",
    as: "enfermedades",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Enfermedad.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });

  // Paciente 1:N Alergia
  Paciente.hasMany(Alergia, {
    foreignKey: "pacienteId",
    as: "alergias",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Alergia.belongsTo(Paciente, {
    foreignKey: "pacienteId",
    as: "paciente",
  });
}
