function EncabezadoPanel({ usuario, totalActividades, actividadesCompletadas, onCerrarSesion }) {
  const actividadesPendientes = totalActividades - actividadesCompletadas;

  return (
    <header className="hero">
      <nav>
        <span className="brand">React Personal</span>
        <button type="button" className="ghost-button" onClick={onCerrarSesion}>
          Cerrar sesion
        </button>
      </nav>

      <div className="hero-content">
        <div>
          <p className="eyebrow">Hola, {usuario.nombre}</p>
          <h1>Tu horario, tus datos y tu reporte</h1>
        </div>

        <div className="summary-grid">
          <article>
            <span>{totalActividades}</span>
            <p>Actividades</p>
          </article>
          <article>
            <span>{actividadesCompletadas}</span>
            <p>Completadas</p>
          </article>
          <article>
            <span>{actividadesPendientes}</span>
            <p>Pendientes</p>
          </article>
        </div>
      </div>
    </header>
  );
}

export { EncabezadoPanel };
