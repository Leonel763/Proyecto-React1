function ReportPanel({ report, reportStatus, onSendReport }) {
  const isSending = reportStatus.type === 'loading';
  const statusClassName =
    reportStatus.type === 'error' ? 'error-message' : 'success-message';

  return (
    <article className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Reporte</p>
          <h2>Enviar resumen</h2>
        </div>
      </div>

      <pre className="report-preview">{report}</pre>
      <button type="button" onClick={onSendReport} className="report-button" disabled={isSending}>
        {isSending ? 'Enviando...' : 'Generar y enviar por correo'}
      </button>
      {reportStatus.message && <p className={statusClassName}>{reportStatus.message}</p>}
    </article>
  );
}

export { ReportPanel };
