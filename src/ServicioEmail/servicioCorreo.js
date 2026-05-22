const configuracionCorreo = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};

function validarConfiguracionCorreo() {
  const valoresFaltantes = Object.entries(configuracionCorreo)
    .filter(([, valor]) => !valor)
    .map(([nombre]) => nombre);

  if (valoresFaltantes.length > 0) {
    throw new Error(
      'Falta configurar EmailJS. Revisa el archivo .env y agrega SERVICE_ID, TEMPLATE_ID y PUBLIC_KEY.'
    );
  }
}

async function enviarReportePorCorreo({ correo, nombre, reporte }) {
  validarConfiguracionCorreo();

  const respuesta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: configuracionCorreo.serviceId,
      template_id: configuracionCorreo.templateId,
      user_id: configuracionCorreo.publicKey,
      template_params: {
        to_email: correo,
        to_name: nombre,
        report_message: reporte,
      },
    }),
  });

  if (!respuesta.ok) {
    const textoError = await respuesta.text();
    throw new Error(`No se pudo enviar el correo. EmailJS respondio: ${textoError}`);
  }
}

export { enviarReportePorCorreo };
