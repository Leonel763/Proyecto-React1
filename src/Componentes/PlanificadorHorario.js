import { dias } from '../data/horarioInicial';

function PlanificadorHorario({
  nuevaActividad,
  horario,
  onCambiarActividad,
  onAgregarActividad,
  onEliminarActividad,
  onCambiarEstadoActividad,
}) {
  return (
    <article className="panel planner-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Horario personal</p>
          <h2>Agrega actividades</h2>
        </div>
      </div>

      <form className="activity-form" onSubmit={onAgregarActividad}>
        <label>
          Dia
          <select
            value={nuevaActividad.dia}
            onChange={(evento) =>
              onCambiarActividad({ ...nuevaActividad, dia: evento.target.value })
            }
          >
            {dias.map((dia) => (
              <option key={dia}>{dia}</option>
            ))}
          </select>
        </label>

        <label>
          Hora
          <input
            type="time"
            value={nuevaActividad.hora}
            onChange={(evento) =>
              onCambiarActividad({ ...nuevaActividad, hora: evento.target.value })
            }
          />
        </label>

        <label>
          Categoria
          <select
            value={nuevaActividad.categoria}
            onChange={(evento) =>
              onCambiarActividad({ ...nuevaActividad, categoria: evento.target.value })
            }
          >
            <option>Estudio</option>
            <option>Proyecto</option>
            <option>Trabajo</option>
            <option>Personal</option>
          </select>
        </label>

        <label className="wide-field">
          Actividad
          <input
            type="text"
            value={nuevaActividad.titulo}
            onChange={(evento) =>
              onCambiarActividad({ ...nuevaActividad, titulo: evento.target.value })
            }
            placeholder="Describe tu actividad"
          />
        </label>

        <button type="submit">Agregar</button>
      </form>

      <div className="schedule-list">
        {horario.map((actividad) => (
          <article
            key={actividad.id}
            className={actividad.completada ? 'activity done' : 'activity'}
          >
            <button
              type="button"
              className="check-button"
              onClick={() => onCambiarEstadoActividad(actividad.id)}
              aria-label="Cambiar estado"
            >
              {actividad.completada ? 'OK' : '--'}
            </button>
            <div>
              <strong>{actividad.titulo}</strong>
              <p>
                {actividad.dia} - {actividad.hora} - {actividad.categoria}
              </p>
            </div>
            <button
              type="button"
              className="delete-button"
              onClick={() => onEliminarActividad(actividad.id)}
              aria-label="Eliminar actividad"
            >
              X
            </button>
          </article>
        ))}
      </div>
    </article>
  );
}

export { PlanificadorHorario };
