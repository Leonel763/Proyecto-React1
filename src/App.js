import { useEffect, useMemo, useState } from 'react';
import {
  BandaAprendizaje,
  EncabezadoPanel,
  PanelReporte,
  PantallaLogin,
  PlanificadorHorario,
  TarjetasApis,
} from './Componentes';
import { horarioInicial } from './data/horarioInicial';
import { enviarReportePorCorreo } from './ServicioEmail/servicioCorreo';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [formularioLogin, setFormularioLogin] = useState({
    nombre: '',
    correo: '',
    password: '',
  });
  const [horario, setHorario] = useState(horarioInicial);
  const [nuevaActividad, setNuevaActividad] = useState({
    dia: 'Lunes',
    hora: '09:00',
    titulo: '',
    categoria: 'Estudio',
  });
  const [clima, setClima] = useState(null);
  const [dolar, setDolar] = useState(null);
  const [errorApis, setErrorApis] = useState('');
  const [estadoReporte, setEstadoReporte] = useState({
    tipo: '',
    mensaje: '',
  });

  useEffect(() => {
    async function cargarDatosApis() {
      try {
        setErrorApis('');

        const [respuestaClima, respuestaDolar] = await Promise.all([
          fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=-12.06&longitude=-77.04&current=temperature_2m,relative_humidity_2m,wind_speed_10m'
          ),
          fetch('https://open.er-api.com/v6/latest/USD'),
        ]);

        if (!respuestaClima.ok || !respuestaDolar.ok) {
          throw new Error('No se pudo cargar la informacion externa.');
        }

        const datosClima = await respuestaClima.json();
        const datosDolar = await respuestaDolar.json();

        setClima(datosClima.current);
        setDolar({
          pen: datosDolar.rates.PEN,
          eur: datosDolar.rates.EUR,
          actualizado: datosDolar.time_last_update_utc,
        });
      } catch (error) {
        setErrorApis('Las APIs no respondieron ahora. Intenta otra vez en unos minutos.');
      }
    }

    cargarDatosApis();
  }, []);

  const actividadesCompletadas = horario.filter((actividad) => actividad.completada).length;

  const reporte = useMemo(() => {
    const actividadesPendientes = horario.length - actividadesCompletadas;

    return [
      `Reporte personal de ${usuario?.nombre || 'estudiante'}`,
      `Actividades registradas: ${horario.length}`,
      `Actividades completadas: ${actividadesCompletadas}`,
      `Actividades pendientes: ${actividadesPendientes}`,
      clima
        ? `Clima actual en Lima: ${clima.temperature_2m} C, humedad ${clima.relative_humidity_2m}%.`
        : 'Clima actual: pendiente de cargar.',
      dolar
        ? `Cambio referencial: 1 USD = ${dolar.pen.toFixed(2)} PEN.`
        : 'Cambio de dolar: pendiente de cargar.',
    ].join('\n');
  }, [actividadesCompletadas, clima, dolar, horario.length, usuario?.nombre]);

  function iniciarSesion(evento) {
    evento.preventDefault();

    if (!formularioLogin.nombre || !formularioLogin.correo || !formularioLogin.password) {
      return;
    }

    setUsuario({
      nombre: formularioLogin.nombre,
      correo: formularioLogin.correo,
    });
  }

  function agregarActividad(evento) {
    evento.preventDefault();

    if (!nuevaActividad.titulo.trim()) {
      return;
    }

    setHorario([
      ...horario,
      {
        id: Date.now(),
        ...nuevaActividad,
        titulo: nuevaActividad.titulo.trim(),
        completada: false,
      },
    ]);

    setNuevaActividad({
      dia: 'Lunes',
      hora: '09:00',
      titulo: '',
      categoria: 'Estudio',
    });
  }

  function cambiarEstadoActividad(id) {
    setHorario(
      horario.map((actividad) =>
        actividad.id === id ? { ...actividad, completada: !actividad.completada } : actividad
      )
    );
  }

  function eliminarActividad(id) {
    setHorario(horario.filter((actividad) => actividad.id !== id));
  }

  async function enviarReporte() {
    try {
      setEstadoReporte({
        tipo: 'cargando',
        mensaje: 'Enviando reporte...',
      });

      await enviarReportePorCorreo({
        correo: usuario.correo,
        nombre: usuario.nombre,
        reporte,
      });

      setEstadoReporte({
        tipo: 'exito',
        mensaje: 'Reporte enviado automaticamente al correo.',
      });
    } catch (error) {
      setEstadoReporte({
        tipo: 'error',
        mensaje: error.message,
      });
    }
  }

  if (!usuario) {
    return (
      <PantallaLogin
        formulario={formularioLogin}
        onCambiarFormulario={setFormularioLogin}
        onIniciarSesion={iniciarSesion}
      />
    );
  }

  return (
    <main className="app-shell">
      <EncabezadoPanel
        usuario={usuario}
        totalActividades={horario.length}
        actividadesCompletadas={actividadesCompletadas}
        onCerrarSesion={() => setUsuario(null)}
      />

      <section className="content-grid">
        <PlanificadorHorario
          nuevaActividad={nuevaActividad}
          horario={horario}
          onCambiarActividad={setNuevaActividad}
          onAgregarActividad={agregarActividad}
          onEliminarActividad={eliminarActividad}
          onCambiarEstadoActividad={cambiarEstadoActividad}
        />

        <aside className="side-column">
          <TarjetasApis errorApis={errorApis} dolar={dolar} clima={clima} />
          <PanelReporte
            reporte={reporte}
            estadoReporte={estadoReporte}
            onEnviarReporte={enviarReporte}
          />
        </aside>
      </section>

      <BandaAprendizaje />
    </main>
  );
}

export default App;
