// public/js/tareas.js
// Acciones de las tarjetas (inicio y completadas): completar y eliminar
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-tareas");
  const mensaje = document.getElementById("mensaje");
  if (!lista) return;

  const mostrarMensaje = (texto) => {
    mensaje.textContent = texto;
    mensaje.className = "mb-4 rounded-md px-4 py-3 font-medium bg-danger/10 text-danger";
  };

  const llamarApi = async (url, metodo) => {
    try {
      const respuesta = await fetch(url, { method: metodo });
      const datos = await respuesta.json();
      if (!respuesta.ok) {
        mostrarMensaje(datos.message || "Ocurrió un error inesperado");
        return false;
      }
      return true;
    } catch (error) {
      mostrarMensaje("No se pudo conectar con el servidor");
      return false;
    }
  };

  lista.addEventListener("click", async (e) => {
    const boton = e.target.closest("button[data-accion]");
    if (!boton) return;

    const { accion, id } = boton.dataset;
    boton.disabled = true;

    let exito = false;
    if (accion === "completar") {
      exito = await llamarApi(`/api/tareas/${id}/completar`, "PATCH");
    }
    if (accion === "eliminar") {
      if (!confirm("¿Seguro que quieres eliminar esta tarea?")) {
        boton.disabled = false;
        return;
      }
      exito = await llamarApi(`/api/tareas/${id}`, "DELETE");
    }

    if (exito) {
      window.location.reload();
    } else {
      boton.disabled = false;
    }
  });
});
