// models/Tarea.js
// MODELO: define la estructura de una tarea en la base de datos
const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    minlength: [3, "El título debe tener al menos 3 caracteres"],
    maxlength: [100, "El título no puede superar los 100 caracteres"],
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [500, "La descripción no puede superar los 500 caracteres"],
    default: "",
  },
  completado: {
    type: Boolean,
    default: false,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  // Borrado lógico: si tiene fecha, la tarea se considera eliminada
  fecha_eliminado: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Tarea", tareaSchema);
