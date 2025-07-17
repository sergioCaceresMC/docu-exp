import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class Diagnostico extends Model {}

Diagnostico.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Diagnostico",
    timestamps: true,
    underscored: true,
  }
);
