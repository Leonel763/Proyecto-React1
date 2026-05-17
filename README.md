# React Personal

Proyecto sencillo hecho con React para practicar lo mas importante del curso: componentes, estados, formularios, listas, renderizado dinamico y consumo de APIs.

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

## Envio automatico de correo

El boton de reporte usa EmailJS. Esto permite enviar correos desde React sin abrir Gmail u Outlook.

Primero crea una cuenta en EmailJS y consigue estos datos:

- Service ID
- Template ID
- Public Key

Copia el archivo `.env.example` y crea un archivo nuevo llamado `.env`:

```bash
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key
```

En tu plantilla de EmailJS usa estas variables:

```text
{{to_email}}
{{to_name}}
{{report_message}}
```

Despues de cambiar el archivo `.env`, detén el servidor y vuelve a ejecutar `npm start`.

Nota: la Public Key de EmailJS esta pensada para usarse en el frontend. No coloques claves privadas ni passwords reales dentro de React.

## Como ejecutarlo

Instala las dependencias si aun no estan instaladas:

```bash
npm install
```

Ejecuta el proyecto:

```bash
npm start
```

Abre:

```text
http://localhost:3000
```

Para verificar que compila:

```bash
npm run build
```
