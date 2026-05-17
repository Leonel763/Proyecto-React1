const initialSchedule = [
  {
    id: 1,
    day: 'Lunes',
    time: '08:00',
    title: 'Estudiar React',
    category: 'Estudio',
    done: false,
  },
  {
    id: 2,
    day: 'Martes',
    time: '18:30',
    title: 'Practicar componentes',
    category: 'Proyecto',
    done: true,
  },
  {
    id: 3,
    day: 'Viernes',
    time: '20:00',
    title: 'Revisar el reporte semanal',
    category: 'Personal',
    done: false,
  },
];

const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export { days, initialSchedule };
