function PanelReporte({ reporte, estadoReporte, onEnviarReporte }) {
  const estaEnviando = estadoReporte.tipo === 'cargando';
  const claseMensaje = estadoReporte.tipo === 'error' ? 'error-message' : 'success-message';

  return (
    <article className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Reporte</p>
          <h2>Enviar resumen</h2>
        </div>
      </div>

      <pre className="report-preview">{reporte}</pre>
      <button
        type="button"
        onClick={onEnviarReporte}
        className="report-button"
        disabled={estaEnviando}
      >
        {estaEnviando ? 'Enviando...' : 'Generar y enviar por correo'}
      </button>
      {estadoReporte.mensaje && <p className={claseMensaje}>{estadoReporte.mensaje}</p>}
    </article>
  );
}

export { PanelReporte };
