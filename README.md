# React Personal

Proyecto sencillo hecho con React que contiene componentes, estados, formularios, listas, renderizado dinamico y consumo de APIs.

## Que hace la app

- Tiene un login simple para entrar con nombre, correo y password.
- Permite crear un horario personal con dia, hora, categoria y actividad.
- Permite marcar actividades como completadas o eliminarlas.
- Consume APIs publicas para mostrar el clima de Lima y el cambio referencial del dolar.
- Genera un reporte con tu avance y lo envia automaticamente con EmailJS.

## Que se hizo en React

La pantalla se divide en partes visuales, pero la logica principal esta en `src/App.js`.

- `useState` guarda datos que cambian: usuario, formulario, horario, clima, dolar y reporte.
- `useEffect` ejecuta las llamadas a las APIs cuando carga la app.
- `map` pinta la lista de actividades desde un arreglo.
- Los formularios son controlados: cada input cambia un estado.
- Cuando agregas, completas o borras una actividad, React vuelve a pintar la interfaz automaticamente.
- La carpeta `src/Componentes` separa la pantalla en componentes reutilizables.

## Como esta dividido ahora

Los nombres del codigo estan en español para que sea mas facil leerlo:

- `App.js`: controla la logica principal de la app.
- `PantallaLogin.js`: muestra el formulario para iniciar sesion.
- `EncabezadoPanel.js`: muestra el saludo y los contadores.
- `PlanificadorHorario.js`: permite crear, completar y eliminar actividades.
- `TarjetasApis.js`: muestra el clima y el cambio del dolar.
- `PanelReporte.js`: muestra el reporte y el boton para enviarlo.
- `BandaAprendizaje.js`: muestra una explicacion corta de React.
- `horarioInicial.js`: guarda las actividades iniciales.
- `servicioCorreo.js`: contiene la funcion que envia el reporte con EmailJS.

## Envio automatico de correo

El boton de reporte usa EmailJS. Esto permite enviar correos desde React sin abrir Gmail u Outlook.

Primero crea una cuenta en EmailJS y consigue estos datos:

- Service ID
- Template ID
- Public Key



Para verificar que compila:

```bash
npm run build
```
