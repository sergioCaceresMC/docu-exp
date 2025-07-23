import { Paciente } from "../models/paciente.js";
import { Consulta } from "../models/consulta.js";
import { ExamenFisico } from "../models/examen-fisico.js";
import { Laboratorio, Archivo } from "../models/examen-laboratorio.js";
import {
  Vacuna,
  Alergia,
  Familiar,
  Enfermedad,
  Cirugia,
} from "../models/antecedentes.js";
import { Diagnostico } from "../models/diagnostico.js";
import { Tratamiento } from "../models/tratamiento.js";

export async function seed1() {
  try {
    //connectDB();
    // 1. Crear Paciente
    const paciente: any = await Paciente.create({
      name: "Juan Pérez",
      birthday: new Date("1990-05-12"),
      gender: "M",
      dui: "06421728",
      phone: "+34663878799",
      address: "Calle Falsa 123",
    });

    // 2. Consulta
    const consulta: any = await Consulta.create({
      reason: "Dolor de cabeza persistente",
      type: "consulta",
      content: "Paciente refiere dolor en la zona frontal",
      date: new Date(),
      pacienteId: paciente.id,
    });

    // 2.1 Control
    const control: any = await Consulta.create({
      reason: "Seguimiento del caso",
      type: "control",
      content: "Paciente refiere dolor en la zona frontal",
      date: new Date(),
      pacienteId: paciente.id,
    });

    // 3. Examen físico
    await ExamenFisico.create({
      arterialPressure: "120/80",
      cardiacFrecuency: 62,
      respiratorRate: 42,
      weight: 70,
      height: 175,
      temperature: 36.5,
      abdominalcircunference: 90,
      oxygensaturation: 30,
      consultaId: consulta.id,
    });

    // 4. Diagnóstico y Tratamiento
    const diagnostico: any = await Diagnostico.create({
      diagnosis: "Migraña leve",
      date: new Date(),
      consultaId: consulta.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Paracetamol 500mg cada 8h por 3 días",
      consultaId: consulta.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Masaje",
      consultaId: control.id,
    });

    // 5. Antecedentes
    await Vacuna.create({
      name: "Tétanos",
      date: new Date("2010-04-01"),
      pacienteId: paciente.id,
    });

    await Alergia.create({
      name: "Polen",
      date: new Date("2015-06-15"),
      pacienteId: paciente.id,
    });

    const enfermedad: any = await Enfermedad.create({
      name: "Hipertensión",
      date: new Date("2018-08-20"),
      pacienteId: paciente.id,
    });

    await Familiar.create({
      name: "Padre",
      enfermedadId: enfermedad.id,
    });

    await Cirugia.create({
      name: "Apendicectomía",
      description: "Cirugía de apéndice",
      date: new Date("2005-03-10"),
      pacienteId: paciente.id,
    });

    // 6. Laboratorio y Archivo
    const lab: any = await Laboratorio.create({
      name: "Hemograma",
      laboratory: "Laboratorio Central",
      content: "Valores normales en glóbulos rojos y blancos.",
      date: new Date(),
      pacienteId: paciente.id,
    });

    await Archivo.create({
      name: "informe_hemograma.pdf",
      direction: "/files/informe_hemograma.pdf",
      laboratorioId: lab.id,
    });

    console.log("✅ Seed completado exitosamente.");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
}
