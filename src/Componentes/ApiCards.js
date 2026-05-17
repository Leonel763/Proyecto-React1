function ApiCards({ apiError, dollar, weather }) {
  return (
    <article className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">APIs externas</p>
          <h2>Datos en vivo</h2>
        </div>
      </div>

      {apiError && <p className="error-message">{apiError}</p>}

      <div className="api-cards">
        <div>
          <span>Clima Lima</span>
          <strong>{weather ? `${weather.temperature_2m} C` : 'Cargando...'}</strong>
          <p>{weather ? `Humedad ${weather.relative_humidity_2m}%` : 'Open-Meteo API'}</p>
        </div>

        <div>
          <span>Dolar</span>
          <strong>{dollar ? `S/ ${dollar.pen.toFixed(2)}` : 'Cargando...'}</strong>
        </div>
      </div>
    </article>
  );
}

export { ApiCards };
