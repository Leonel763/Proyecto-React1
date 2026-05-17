import { useEffect, useMemo, useState } from 'react';
import {ApiCards} from './Componentes/ApiCards';
import {DashboardHero} from './Componentes/DashboardHero';
import {LearningBand} from './Componentes/LearningBand';
import {LoginScreen} from './Componentes/LoginScreen';
import {ReportPanel} from './Componentes/ReportPanel';
import {SchedulePlanner} from './Componentes/SchedulePlanner';
import { initialSchedule } from './data/initialSchedule';
import { sendReportEmail } from './services/emailService';
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [schedule, setSchedule] = useState(initialSchedule);
  const [newActivity, setNewActivity] = useState({
    day: 'Lunes',
    time: '09:00',
    title: '',
    category: 'Estudio',
  });
  const [weather, setWeather] = useState(null);
  const [dollar, setDollar] = useState(null);
  const [apiError, setApiError] = useState('');
  const [reportStatus, setReportStatus] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    async function loadApiData() {
      try {
        setApiError('');

        const [weatherResponse, dollarResponse] = await Promise.all([
          fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=-12.06&longitude=-77.04&current=temperature_2m,relative_humidity_2m,wind_speed_10m'
          ),
          fetch('https://open.er-api.com/v6/latest/USD'),
        ]);

        if (!weatherResponse.ok || !dollarResponse.ok) {
          throw new Error('No se pudo cargar la informacion externa.');
        }

        const weatherData = await weatherResponse.json();
        const dollarData = await dollarResponse.json();

        setWeather(weatherData.current);
        setDollar({
          pen: dollarData.rates.PEN,
          eur: dollarData.rates.EUR,
          updated: dollarData.time_last_update_utc,
        });
      } catch (error) {
        setApiError('Las APIs no respondieron ahora. Intenta otra vez en unos minutos.');
      }
    }

    loadApiData();
  }, []);

  const completedActivities = schedule.filter((activity) => activity.done).length;

  const report = useMemo(() => {
    const pending = schedule.length - completedActivities;

    return [
      `Reporte personal de ${user?.name || 'estudiante'}`,
      `Actividades registradas: ${schedule.length}`,
      `Actividades completadas: ${completedActivities}`,
      `Actividades pendientes: ${pending}`,
      weather
        ? `Clima actual en Lima: ${weather.temperature_2m} C, humedad ${weather.relative_humidity_2m}%.`
        : 'Clima actual: pendiente de cargar.',
      dollar
        ? `Cambio referencial: 1 USD = ${dollar.pen.toFixed(2)} PEN.`
        : 'Cambio de dolar: pendiente de cargar.',
    ].join('\n');
  }, [completedActivities, dollar, schedule.length, user?.name, weather]);

  function handleLogin(event) {
    event.preventDefault();

    if (!loginForm.name || !loginForm.email || !loginForm.password) {
      return;
    }

    setUser({
      name: loginForm.name,
      email: loginForm.email,
    });
  }

  function handleAddActivity(event) {
    event.preventDefault();

    if (!newActivity.title.trim()) {
      return;
    }

    setSchedule([
      ...schedule,
      {
        id: Date.now(),
        ...newActivity,
        title: newActivity.title.trim(),
        done: false,
      },
    ]);

    setNewActivity({
      day: 'Lunes',
      time: '09:00',
      title: '',
      category: 'Estudio',
    });
  }

  function toggleActivity(id) {
    setSchedule(
      schedule.map((activity) =>
        activity.id === id ? { ...activity, done: !activity.done } : activity
      )
    );
  }

  function deleteActivity(id) {
    setSchedule(schedule.filter((activity) => activity.id !== id));
  }

  async function handleSendReport() {
    try {
      setReportStatus({
        type: 'loading',
        message: 'Enviando reporte...',
      });

      await sendReportEmail({
        email: user.email,
        name: user.name,
        report,
      });

      setReportStatus({
        type: 'success',
        message: 'Reporte enviado automaticamente al correo.',
      });
    } catch (error) {
      setReportStatus({
        type: 'error',
        message: error.message,
      });
    }
  }

  if (!user) {
    return (
      <LoginScreen form={loginForm} onFormChange={setLoginForm} onLogin={handleLogin} />
    );
  }

  return (
    <main className="app-shell">
      <DashboardHero
        user={user}
        totalActivities={schedule.length}
        completedActivities={completedActivities}
        onLogout={() => setUser(null)}
      />

      <section className="content-grid">
        <SchedulePlanner
          newActivity={newActivity}
          schedule={schedule}
          onActivityChange={setNewActivity}
          onAddActivity={handleAddActivity}
          onDeleteActivity={deleteActivity}
          onToggleActivity={toggleActivity}
        />

        <aside className="side-column">
          <ApiCards apiError={apiError} dollar={dollar} weather={weather} />
          <ReportPanel report={report} reportStatus={reportStatus} onSendReport={handleSendReport} />
        </aside>
      </section>

      <LearningBand />
    </main>
  );
}

export default App;
