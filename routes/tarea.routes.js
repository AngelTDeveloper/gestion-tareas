// routes/tarea.routes.js
// Rutas de la API (responden JSON). Prefijo: /api/tareas
const express = require("express");
const router = express.Router();
const {
  crearTarea,
  actualizarTarea,
  completarTarea,
  eliminarTarea,
  listarIncompletas,
  listarCompletadas,
} = require("../controllers/tarea.controller");

// Importante: las rutas fijas van ANTES que las rutas con /:id
router.get("/incompletas", listarIncompletas);
router.get("/completadas", listarCompletadas);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.patch("/:id/completar", completarTarea);
router.delete("/:id", eliminarTarea);

module.exports = router;
