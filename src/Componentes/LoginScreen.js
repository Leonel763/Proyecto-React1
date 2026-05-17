function LoginScreen({ form, onFormChange, onLogin }) {
  return (
    <main className="login-screen">
      <section className="login-panel">
       <img src = "gato.png" alt="Imagen de un gato"style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '4px' 
        }}/>
        <form className="login-form" onSubmit={onLogin}>
          <p className="eyebrow">Login</p>
          <label>
            Nombre
            <input
              type="text"
              value={form.name}
              onChange={(event) => onFormChange({ ...form, name: event.target.value })}
              placeholder="Tu nombre"
            />
          </label>

          <label>
            Correo
            <input
              type="text"
              value={form.email}
              onChange={(event) => onFormChange({ ...form, email: event.target.value })}
              placeholder="tu-correo@ejemplo.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => onFormChange({ ...form, password: event.target.value })}
              placeholder="Minimo 4 caracteres"
            />
          </label>

          <button type="submit">Entrar a mi horario</button>
        </form>
      </section>
    </main>
  );
}

export { LoginScreen };
