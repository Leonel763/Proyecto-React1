function TarjetasApis({ errorApis, dolar, clima }) {
  return (
    <article className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">APIs externas</p>
          <h2>Datos en vivo</h2>
        </div>
      </div>

      {errorApis && <p className="error-message">{errorApis}</p>}

      <div className="api-cards">
        <div>
          <span>Clima Lima</span>
          <strong>{clima ? `${clima.temperature_2m} C` : 'Cargando...'}</strong>
          <p>{clima ? `Humedad ${clima.relative_humidity_2m}%` : 'Open-Meteo API'}</p>
        </div>

        <div>
          <span>Dolar</span>
          <strong>{dolar ? `S/ ${dolar.pen.toFixed(2)}` : 'Cargando...'}</strong>
        </div>
      </div>
    </article>
  );
}

export { TarjetasApis };
