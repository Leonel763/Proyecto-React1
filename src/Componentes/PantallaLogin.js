function PantallaLogin({ formulario, onCambiarFormulario, onIniciarSesion }) {
  return (
    <main className="login-screen">
      <section className="login-panel">
        <img
          src="gato.png"
          alt="Imagen decorativa"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
        <form className="login-form" onSubmit={onIniciarSesion}>
          <p className="eyebrow">Login</p>
          <label>
            Nombre
            <input
              type="text"
              value={formulario.nombre}
              onChange={(evento) =>
                onCambiarFormulario({ ...formulario, nombre: evento.target.value })
              }
              placeholder="Tu nombre"
            />
          </label>

          <label>
            Correo
            <input
              type="text"
              value={formulario.correo}
              onChange={(evento) =>
                onCambiarFormulario({ ...formulario, correo: evento.target.value })
              }
              placeholder="tu-correo@ejemplo.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formulario.password}
              onChange={(evento) =>
                onCambiarFormulario({ ...formulario, password: evento.target.value })
              }
              placeholder="Minimo 4 caracteres"
            />
          </label>

          <button type="submit">Entrar a mi horario</button>
        </form>
      </section>
    </main>
  );
}

export { PantallaLogin };
