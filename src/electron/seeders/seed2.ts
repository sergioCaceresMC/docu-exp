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

export async function seed2() {
  try {
    // ========== Paciente 2 ==========
    const paciente2: any = await Paciente.create({
      name: "María González",
      birthday: new Date("1985-11-22"),
      gender: "F",
      dui: "04521397",
      phone: "+34678945612",
      address: "Avenida Siempre Viva 742",
    });

    const consulta2: any = await Consulta.create({
      reason: "Dolor abdominal",
      type: "consulta",
      content: "Paciente refiere dolor en el lado derecho inferior",
      date: new Date(),
      pacienteId: paciente2.id,
    });

    const control2: any = await Consulta.create({
      reason: "Revisión postoperatoria",
      type: "control",
      content: "Evolución favorable post cirugía",
      date: new Date(),
      pacienteId: paciente2.id,
    });

    await ExamenFisico.create({
      arterialPressure: "120/80",
      cardiacFrecuency: 62,
      respiratorRate: 42,
      weight: 70,
      height: 175,
      temperature: 36.5,
      abdominalcircunference: 90,
      oxygensaturation: 30,
      consultaId: consulta2.id,
    });

    const diagnostico2: any = await Diagnostico.create({
      diagnosis: "Apendicitis aguda",
      date: new Date(),
      consultaId: consulta2.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Cirugía inmediata",
      consultaId: consulta2.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Revisión de herida y reposo",
      consultaId: control2.id,
    });

    await Vacuna.create({
      name: "Hepatitis B",
      date: new Date("2000-07-15"),
      pacienteId: paciente2.id,
    });

    await Alergia.create({
      name: "Penicilina",
      date: new Date("2003-04-20"),
      pacienteId: paciente2.id,
    });

    const enfermedad2: any = await Enfermedad.create({
      name: "Diabetes tipo 2",
      date: new Date("2015-09-10"),
      pacienteId: paciente2.id,
    });

    await Familiar.create({
      name: "Madre",
      enfermedadId: enfermedad2.id,
    });

    await Cirugia.create({
      name: "Colecistectomía",
      description: "Extracción de vesícula biliar",
      date: new Date("2010-05-05"),
      pacienteId: paciente2.id,
    });

    const lab2: any = await Laboratorio.create({
      name: "Perfil lipídico",
      laboratory: "Laboratorio BioSalud",
      content: "Colesterol LDL elevado",
      date: new Date(),
      pacienteId: paciente2.id,
    });

    await Archivo.create({
      name: "perfil_lipidico.pdf",
      direction: "/files/perfil_lipidico.pdf",
      laboratorioId: lab2.id,
    });

    // ========== Paciente 3 ==========
    const paciente3: any = await Paciente.create({
      name: "Carlos Méndez",
      birthday: new Date("2002-02-02"),
      gender: "M",
      dui: "09871234",
      phone: "+34612345678",
      address: "Calle Luna 456",
    });

    const consulta3: any = await Consulta.create({
      reason: "Fiebre y dolor de garganta",
      type: "consulta",
      content: "Se observa enrojecimiento en faringe",
      date: new Date(),
      pacienteId: paciente3.id,
    });

    const control3: any = await Consulta.create({
      reason: "Evaluación tras antibiótico",
      type: "control",
      content: "Síntomas han disminuido",
      date: new Date(),
      pacienteId: paciente3.id,
    });

    await ExamenFisico.create({
      arterialPressure: "120/80",
      cardiacFrecuency: 62,
      respiratorRate: 42,
      weight: 70,
      height: 175,
      temperature: 36.5,
      abdominalcircunference: 90,
      oxygensaturation: 30,
      consultaId: consulta3.id,
    });

    const diagnostico3: any = await Diagnostico.create({
      diagnosis: "Faringitis viral",
      date: new Date(),
      consultaId: consulta3.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Ibuprofeno 400mg cada 8h por 5 días",
      consultaId: consulta3.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Reposo e hidratación",
      consultaId: control3.id,
    });

    await Vacuna.create({
      name: "COVID-19",
      date: new Date("2021-03-10"),
      pacienteId: paciente3.id,
    });

    await Alergia.create({
      name: "Polvo",
      date: new Date("2010-08-12"),
      pacienteId: paciente3.id,
    });

    const enfermedad3: any = await Enfermedad.create({
      name: "Asma",
      date: new Date("2008-04-25"),
      pacienteId: paciente3.id,
    });

    await Familiar.create({
      name: "Hermano",
      enfermedadId: enfermedad3.id,
    });

    await Cirugia.create({
      name: "Corrección de tabique nasal",
      description: "Cirugía para mejorar respiración",
      date: new Date("2018-11-22"),
      pacienteId: paciente3.id,
    });

    const lab3: any = await Laboratorio.create({
      name: "Prueba de PCR",
      laboratory: "Centro Médico Norte",
      content: "Negativo a SARS-CoV-2",
      date: new Date(),
      pacienteId: paciente3.id,
    });

    await Archivo.create({
      name: "pcr_resultado.pdf",
      direction: "/files/pcr_resultado.pdf",
      laboratorioId: lab3.id,
    });

    // ========== Paciente 4 ==========
    const paciente4: any = await Paciente.create({
      name: "Lucía Ramírez",
      birthday: new Date("1998-09-15"),
      gender: "F",
      dui: "07568932",
      phone: "+34633445566",
      address: "Boulevard del Sol 789",
    });

    const consulta4: any = await Consulta.create({
      reason: "Dolor lumbar crónico",
      type: "consulta",
      content: "Dolor localizado en región lumbar baja",
      date: new Date(),
      pacienteId: paciente4.id,
    });

    const control4: any = await Consulta.create({
      reason: "Terapia física de seguimiento",
      type: "control",
      content: "Mejoría leve del dolor",
      date: new Date(),
      pacienteId: paciente4.id,
    });

    await ExamenFisico.create({
      arterialPressure: "120/80",
      cardiacFrecuency: 62,
      respiratorRate: 42,
      weight: 70,
      height: 175,
      temperature: 36.5,
      abdominalcircunference: 90,
      oxygensaturation: 30,
      consultaId: consulta4.id,
    });

    const diagnostico4: any = await Diagnostico.create({
      diagnosis: "Lumbalgia crónica",
      date: new Date(),
      consultaId: consulta4.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Ejercicios de estiramiento y AINEs",
      consultaId: consulta4.id,
    });

    await Tratamiento.create({
      date: new Date(),
      prescription: "Fisioterapia semanal",
      consultaId: control4.id,
    });

    await Vacuna.create({
      name: "Influenza",
      date: new Date("2022-10-01"),
      pacienteId: paciente4.id,
    });

    await Alergia.create({
      name: "Lácteos",
      date: new Date("2000-02-14"),
      pacienteId: paciente4.id,
    });

    const enfermedad4: any = await Enfermedad.create({
      name: "Artritis reumatoide",
      date: new Date("2016-12-01"),
      pacienteId: paciente4.id,
    });

    await Familiar.create({
      name: "Abuela",
      enfermedadId: enfermedad4.id,
    });

    await Cirugia.create({
      name: "Artroscopia de rodilla",
      description: "Reparación de ligamentos",
      date: new Date("2019-06-12"),
      pacienteId: paciente4.id,
    });

    const lab4: any = await Laboratorio.create({
      name: "Resonancia lumbar",
      laboratory: "Diagnóstico Avanzado",
      content: "Signos de degeneración discal leve",
      date: new Date(),
      pacienteId: paciente4.id,
    });

    await Archivo.create({
      name: "resonancia_lumbar.pdf",
      direction: "/files/resonancia_lumbar.pdf",
      laboratorioId: lab4.id,
    });

    console.log("✅ Seed completado exitosamente.");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
}
