import { days } from '../data/initialSchedule';

function SchedulePlanner({
  newActivity,
  schedule,
  onActivityChange,
  onAddActivity,
  onDeleteActivity,
  onToggleActivity,
}) {
  return (
    <article className="panel planner-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Horario personal</p>
          <h2>Agrega actividades</h2>
        </div>
      </div>

      <form className="activity-form" onSubmit={onAddActivity}>
        <label>
          Dia
          <select
            value={newActivity.day}
            onChange={(event) => onActivityChange({ ...newActivity, day: event.target.value })}
          >
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>

        <label>
          Hora
          <input
            type="time"
            value={newActivity.time}
            onChange={(event) => onActivityChange({ ...newActivity, time: event.target.value })}
          />
        </label>

        <label>
          Categoria
          <select
            value={newActivity.category}
            onChange={(event) => onActivityChange({ ...newActivity, category: event.target.value })}
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
            value={newActivity.title}
            onChange={(event) => onActivityChange({ ...newActivity, title: event.target.value })}
            placeholder="Ejemplo: estudiar useState"
          />
        </label>

        <button type="submit">Agregar</button>
      </form>

      <div className="schedule-list">
        {schedule.map((activity) => (
          <article key={activity.id} className={activity.done ? 'activity done' : 'activity'}>
            <button
              type="button"
              className="check-button"
              onClick={() => onToggleActivity(activity.id)}
              aria-label="Cambiar estado"
            >
              {activity.done ? 'OK' : '--'}
            </button>
            <div>
              <strong>{activity.title}</strong>
              <p>
                {activity.day} - {activity.time} - {activity.category}
              </p>
            </div>
            <button
              type="button"
              className="delete-button"
              onClick={() => onDeleteActivity(activity.id)}
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

export { SchedulePlanner };
