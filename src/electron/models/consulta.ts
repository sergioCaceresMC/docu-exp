import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
} from "sequelize";

import { sequelize } from "../database/db.js";
import { Diagnostico } from "./diagnostico.js";
import { Tratamiento } from "./tratamiento.js";
import { ExamenFisico } from "./examen-fisico.js";
import { Paciente } from "./paciente.js";

export class Consulta extends Model {
  // --- Tratamiento: 1:N ---
  public getTratamientos!: HasManyGetAssociationsMixin<Tratamiento>;
  public addTratamiento!: HasManyAddAssociationMixin<Tratamiento, string>;
  public createTratamiento!: HasManyCreateAssociationMixin<Tratamiento>;
  public setTratamientos!: HasManySetAssociationsMixin<Tratamiento, string>;
  public removeTratamiento!: HasManyRemoveAssociationMixin<Tratamiento, string>;

  // --- Diagnostico: 1:N ---
  public getDiagnosticos!: HasManyGetAssociationsMixin<Diagnostico>;
  public addDiagnostico!: HasManyAddAssociationMixin<Diagnostico, string>;
  public createDiagnostico!: HasManyCreateAssociationMixin<Diagnostico>;
  public setDiagnosticos!: HasManySetAssociationsMixin<Diagnostico, string>;
  public removeDiagnostico!: HasManyRemoveAssociationMixin<Diagnostico, string>;

  // --- Examen Físico: 1:1 ---
  public getExamenFisico!: HasOneGetAssociationMixin<ExamenFisico>;
  public setExamenFisico!: HasOneSetAssociationMixin<ExamenFisico, string>;
  public createExamenFisico!: HasOneCreateAssociationMixin<ExamenFisico>;

  // --- Paciente: N:1 ---
  public getPaciente!: BelongsToGetAssociationMixin<Paciente>;
  public setPaciente!: BelongsToSetAssociationMixin<Paciente, string>;

  // --- Consulta padre: N:1 ---
  public getParentConsulta!: BelongsToGetAssociationMixin<Consulta>;
  public setParentConsulta!: BelongsToSetAssociationMixin<Consulta, string>;

  // --- Controles (consultas hijas): 1:N ---
  public getControls!: HasManyGetAssociationsMixin<Consulta>;
  public addControl!: HasManyAddAssociationMixin<Consulta, string>;
  public createControl!: HasManyCreateAssociationMixin<Consulta>;
  public setControls!: HasManySetAssociationsMixin<Consulta, string>;
  public removeControl!: HasManyRemoveAssociationMixin<Consulta, string>;
}

Consulta.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    parentConsultaId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Consulta",
    timestamps: true,
    underscored: true,
  }
);
