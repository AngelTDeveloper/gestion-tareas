# Gestión de tareas (MVC)

Node.js + Express + EJS + MongoDB (Mongoose).

## Puesta en marcha
1. Tener MongoDB corriendo (local o Atlas) y ajustar `MONGO_URI` en `.env`.
2. `npm install`
3. `npm run dev`  (o `npm start`)
4. Abrir http://localhost:3000

## Vistas
| Ruta                    | Descripción                  |
|-------------------------|------------------------------|
| GET /                   | Tareas pendientes (incompletas) |
| GET /completadas        | Tareas completadas           |
| GET /tareas/crear       | Formulario de nueva tarea    |
| GET /tareas/:id/editar  | Formulario de edición        |

## API (JSON)
| Método | Ruta                          | Acción                    |
|--------|-------------------------------|---------------------------|
| POST   | /api/tareas                   | Crear tarea (incompleta)  |
| PUT    | /api/tareas/:id               | Actualizar tarea          |
| PATCH  | /api/tareas/:id/completar     | Marcar como completada    |
| DELETE | /api/tareas/:id               | Eliminar (borrado lógico) |
| GET    | /api/tareas/incompletas       | Listar incompletas        |
| GET    | /api/tareas/completadas       | Listar completadas        |
