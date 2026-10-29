// controllers/tarea.controller.js
// CONTROLADOR (API JSON): lógica de negocio de las tareas
const mongoose = require("mongoose");
const Tarea = require("../models/Tarea");

// Valida el id y busca una tarea que no esté eliminada.
// Devuelve { tarea } o { error: { status, message } }
const buscarTareaActiva = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return { error: { status: 400, message: "El id de la tarea no es válido" } };
  }
  const tarea = await Tarea.findOne({ _id: id, fecha_eliminado: null });
  if (!tarea) {
    return { error: { status: 404, message: "Tarea no encontrada" } };
  }
  return { tarea };
};

// Valida título y descripción. Devuelve un mensaje de error o null
const validarCampos = ({ titulo, descripcion }) => {
  if (typeof titulo !== "string" || titulo.trim().length === 0) {
    return "El título es obligatorio";
  }
  if (titulo.trim().length < 3) {
    return "El título debe tener al menos 3 caracteres";
  }
  if (titulo.trim().length > 100) {
    return "El título no puede superar los 100 caracteres";
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return "La descripción debe ser texto";
  }
  if (descripcion && descripcion.trim().length > 500) {
    return "La descripción no puede superar los 500 caracteres";
  }
  return null;
};

// POST /api/tareas  -> Crear tarea (siempre inicia como incompleta)
const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    const errorValidacion = validarCampos({ titulo, descripcion });
    if (errorValidacion) {
      return res.status(400).json({ message: errorValidacion });
    }

    const tarea = await Tarea.create({
      titulo,
      descripcion,
      completado: false,
    });

    return res.status(201).json({ message: "Tarea creada con éxito", tarea });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la tarea", error: error.message });
  }
};

// PUT /api/tareas/:id  -> Actualizar título y/o descripción
const actualizarTarea = async (req, res) => {
  try {
    const { error, tarea } = await buscarTareaActiva(req.params.id);
    if (error) return res.status(error.status).json({ message: error.message });

    if (tarea.completado) {
      return res
        .status(400)
        .json({ message: "No se puede editar una tarea que ya está completada" });
    }

    const { titulo, descripcion } = req.body;
    const errorValidacion = validarCampos({ titulo, descripcion });
    if (errorValidacion) {
      return res.status(400).json({ message: errorValidacion });
    }

    tarea.titulo = titulo;
    if (descripcion !== undefined) tarea.descripcion = descripcion;
    await tarea.save();

    return res.json({ message: "Tarea actualizada con éxito", tarea });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

// PATCH /api/tareas/:id/completar  -> Marcar como completada
const completarTarea = async (req, res) => {
  try {
    const { error, tarea } = await buscarTareaActiva(req.params.id);
    if (error) return res.status(error.status).json({ message: error.message });

    if (tarea.completado) {
      return res.status(400).json({ message: "La tarea ya estaba completada" });
    }

    tarea.completado = true;
    await tarea.save();

    return res.json({ message: "Tarea completada", tarea });
  } catch (error) {
    return res.status(500).json({ message: "Error al completar la tarea", error: error.message });
  }
};

// DELETE /api/tareas/:id  -> Eliminar tarea (borrado lógico)
const eliminarTarea = async (req, res) => {
  try {
    const { error, tarea } = await buscarTareaActiva(req.params.id);
    if (error) return res.status(error.status).json({ message: error.message });

    tarea.fecha_eliminado = new Date();
    await tarea.save();

    return res.json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
  }
};

// GET /api/tareas/incompletas
const listarIncompletas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ completado: false, fecha_eliminado: null }).sort({
      fecha_creacion: -1,
    });
    return res.json(tareas);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar las tareas", error: error.message });
  }
};

// GET /api/tareas/completadas
const listarCompletadas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ completado: true, fecha_eliminado: null }).sort({
      fecha_creacion: -1,
    });
    return res.json(tareas);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar las tareas", error: error.message });
  }
};

module.exports = {
  crearTarea,
  actualizarTarea,
  completarTarea,
  eliminarTarea,
  listarIncompletas,
  listarCompletadas,
};
