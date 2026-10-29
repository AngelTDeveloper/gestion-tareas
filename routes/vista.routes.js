// routes/vista.routes.js
// Rutas de las vistas (responden HTML renderizado con EJS)
const express = require("express");
const router = express.Router();
const {
  vistaInicio,
  vistaCompletadas,
  vistaCrear,
  vistaEditar,
} = require("../controllers/vista.controller");

router.get("/", vistaInicio);
router.get("/completadas", vistaCompletadas);
router.get("/tareas/crear", vistaCrear);
router.get("/tareas/:id/editar", vistaEditar);

module.exports = router;
