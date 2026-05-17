function DashboardHero({ user, totalActivities, completedActivities, onLogout }) {
  const pendingActivities = totalActivities - completedActivities;

  return (
    <header className="hero">
      <nav>
        <span className="brand">🦢</span>
        <button type="button" className="ghost-button" onClick={onLogout}>Cerrar sesion</button>
      </nav>

      <div className="hero-content">
        <div>
          <p className="eyebrow">Hola, {user.name}</p>
          <h1>Tu horario, tus datos y tu reporte</h1>
        </div>

        <div className="summary-grid">
          <article>
            <span>{totalActivities}</span>
            <p>Actividades</p>
          </article>
          <article>
            <span>{completedActivities}</span>
            <p>Completadas</p>
          </article>
          <article>
            <span>{pendingActivities}</span>
            <p>Pendientes</p>
          </article>
        </div>
      </div>
    </header>
  );
}

export { DashboardHero };
