const emailConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};

function validateEmailConfig() {
  const missingValues = Object.entries(emailConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingValues.length > 0) {
    throw new Error(
      'Falta configurar EmailJS. Revisa el archivo .env y agrega SERVICE_ID, TEMPLATE_ID y PUBLIC_KEY.'
    );
  }
}

async function sendReportEmail({ email, name, report }) {
  validateEmailConfig();

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: email,
        to_name: name,
        report_message: report,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`No se pudo enviar el correo. EmailJS respondio: ${errorText}`);
  }
}

export { sendReportEmail };
