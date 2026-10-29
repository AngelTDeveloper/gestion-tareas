// controllers/vista.controller.js
// CONTROLADOR (VISTAS): consulta el Modelo y renderiza las plantillas EJS
const mongoose = require("mongoose");
const Tarea = require("../models/Tarea");

// GET /  -> tareas pendientes
const vistaInicio = async (req, res) => {
  try {
    const tareas = await Tarea.find({ completado: false, fecha_eliminado: null }).sort({
      fecha_creacion: -1,
    });
    return res.render("inicio", { tareas });
  } catch (error) {
    return res.status(500).render("error", { mensaje: "No se pudieron cargar las tareas" });
  }
};

// GET /completadas  -> tareas completadas
const vistaCompletadas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ completado: true, fecha_eliminado: null }).sort({
      fecha_creacion: -1,
    });
    return res.render("completadas", { tareas });
  } catch (error) {
    return res.status(500).render("error", { mensaje: "No se pudieron cargar las tareas" });
  }
};

// GET /tareas/crear  -> formulario de nueva tarea
const vistaCrear = (req, res) => {
  return res.render("crear");
};

// GET /tareas/:id/editar  -> formulario de edición
const vistaEditar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).render("error", { mensaje: "El id de la tarea no es válido" });
    }

    const tarea = await Tarea.findOne({ _id: id, fecha_eliminado: null });
    if (!tarea) {
      return res.status(404).render("error", { mensaje: "La tarea no existe" });
    }
    if (tarea.completado) {
      return res
        .status(400)
        .render("error", { mensaje: "Una tarea completada no se puede editar" });
    }

    return res.render("editar", { tarea });
  } catch (error) {
    return res.status(500).render("error", { mensaje: "No se pudo cargar la tarea" });
  }
};

module.exports = { vistaInicio, vistaCompletadas, vistaCrear, vistaEditar };
