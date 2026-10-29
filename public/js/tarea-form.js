// public/js/tarea-form.js
// Lógica del formulario de crear y editar tarea
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarea");
  const mensaje = document.getElementById("mensaje");
  if (!form) return;

  // Si el formulario tiene data-id, estamos editando; si no, creando
  const id = form.dataset.id;

  const mostrarError = (texto) => {
    mensaje.textContent = texto;
    mensaje.className = "rounded-md px-4 py-3 font-medium bg-danger/10 text-danger";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = form.titulo.value.trim();
    const descripcion = form.descripcion.value.trim();

    // Validaciones en el cliente (el servidor las repite)
    if (titulo.length < 3) {
      return mostrarError("El título debe tener al menos 3 caracteres");
    }
    if (titulo.length > 100) {
      return mostrarError("El título no puede superar los 100 caracteres");
    }
    if (descripcion.length > 500) {
      return mostrarError("La descripción no puede superar los 500 caracteres");
    }

    const boton = form.querySelector("button[type='submit']");
    boton.disabled = true;

    try {
      const respuesta = await fetch(id ? `/api/tareas/${id}` : "/api/tareas", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        mostrarError(datos.message || "Ocurrió un error inesperado");
        boton.disabled = false;
        return;
      }

      window.location.href = "/";
    } catch (error) {
      mostrarError("No se pudo conectar con el servidor");
      boton.disabled = false;
    }
  });
});
