import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// URL pública del sitio, usada para poder mostrar el logo en el email
// (los clientes de correo necesitan una URL absoluta, no pueden usar /logonavbar.png).
// Si más adelante conectás un dominio propio, actualizá SITE_URL en Vercel
// (Settings → Environment Variables) o cambiá el valor por defecto acá.
const SITE_URL = process.env.SITE_URL || 'https://traslados-roberto.vercel.app'
const LOGO_URL = `${SITE_URL}/logonavbar.png`

const SERVICE_LABELS = {
  tour: 'Tour con chofer bilingüe',
  evento: 'Traslado para evento',
  valet: 'Valet Parking',
  otro: 'Otro',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatFecha(fecha) {
  if (!fecha) return null
  try {
    const [y, m, d] = fecha.split('-')
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    return `${parseInt(d, 10)} de ${meses[parseInt(m, 10) - 1]} de ${y}`
  } catch {
    return fecha
  }
}

function buildEmailHtml({ nombre, email, telefono, serviceLabel, fecha, mensaje }) {
  const safeNombre = escapeHtml(nombre)
  const safeEmail = escapeHtml(email)
  const safeTelefono = telefono ? escapeHtml(telefono) : null
  const safeFecha = formatFecha(fecha)
  const safeMensaje = mensaje ? escapeHtml(mensaje).replace(/\n/g, '<br>') : null

  // Fila de detalle (label arriba en dorado, valor abajo) — se usa dentro de una tabla de 2 columnas
  const detailCell = (label, value) => `
    <td valign="top" style="padding:0 12px 22px 0; width:50%;">
      <p style="margin:0 0 4px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#C9A96E; font-weight:700;">${label}</p>
      <p style="margin:0; font-family:Helvetica,Arial,sans-serif; font-size:15px; color:#0A0A0A; font-weight:500;">${value}</p>
    </td>`

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nueva consulta — Traslados con experiencia</title>
</head>
<body style="margin:0; padding:0; background-color:#EFEAE3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EFEAE3; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:4px; overflow:hidden;">

          <!-- Header con logo -->
          <tr>
            <td align="center" style="background-color:#0A0A0A; padding:44px 24px 32px; border-bottom:3px solid #C9A96E;">
              <img src="${LOGO_URL}" alt="Traslados con experiencia" width="190" style="display:block; width:190px; max-width:190px; height:auto; margin:0 auto;">
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:44px 40px 8px;">
              <p style="margin:0 0 10px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#C9A96E; font-weight:700;">Nueva consulta desde la web</p>
              <h1 style="margin:0 0 6px; font-family:Georgia,'Times New Roman',serif; font-size:30px; line-height:1.25; color:#0A0A0A; font-weight:400;">${safeNombre}</h1>
              <p style="margin:0 0 32px; font-family:Helvetica,Arial,sans-serif; font-size:14px; color:#4A4A4A;">${escapeHtml(serviceLabel)}</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #EFEFEF; padding-top:26px; margin-bottom:4px;">
                <tr>
                  ${detailCell('Email', `<a href="mailto:${safeEmail}" style="color:#0A0A0A; text-decoration:none; border-bottom:1px solid #C9A96E;">${safeEmail}</a>`)}
                  ${detailCell('Teléfono', safeTelefono || '—')}
                </tr>
                <tr>
                  ${detailCell('Fecha del viaje', safeFecha || 'No especificada')}
                  ${detailCell('Servicio', escapeHtml(serviceLabel))}
                </tr>
              </table>
            </td>
          </tr>

          ${safeMensaje ? `
          <!-- Mensaje -->
          <tr>
            <td style="padding:0 40px 8px;">
              <p style="margin:0 0 10px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#C9A96E; font-weight:700;">Mensaje</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7F3EE;">
                <tr>
                  <td style="padding:18px 22px; border-left:3px solid #C9A96E; font-family:Georgia,'Times New Roman',serif; font-size:15px; line-height:1.6; color:#1a1a1a; font-style:italic;">
                    “${safeMensaje}”
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:36px 40px 44px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#C9A96E; border-radius:2px;">
                    <a href="mailto:${safeEmail}" style="display:inline-block; padding:15px 36px; font-family:Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#0A0A0A; text-decoration:none; font-weight:700;">
                      Responder a ${safeNombre.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#FAFAF8; padding:24px 40px; border-top:1px solid #EFEFEF;">
              <p style="margin:0; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1px; color:#A0A0A0;">TRASLADOS CON EXPERIENCIA · ESCOBAR Y GBA</p>
              <p style="margin:6px 0 0; font-family:Helvetica,Arial,sans-serif; font-size:11px; color:#A0A0A0;">Este mensaje se generó automáticamente desde el formulario de contacto de la web.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildEmailText({ nombre, email, telefono, serviceLabel, fecha, mensaje }) {
  const safeFecha = formatFecha(fecha)
  return [
    'NUEVA CONSULTA DESDE LA WEB — Traslados con experiencia',
    '',
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `Teléfono: ${telefono || '—'}`,
    `Servicio: ${serviceLabel}`,
    `Fecha del viaje: ${safeFecha || 'No especificada'}`,
    '',
    'Mensaje:',
    mensaje || '—',
  ].join('\n')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Método no permitido.' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { nombre, email, telefono, servicio, fecha, mensaje } = body

    if (!nombre || !nombre.trim() || !email || !servicio) {
      return res.status(400).json({ ok: false, error: 'Faltan campos requeridos: nombre, email y servicio.' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ ok: false, error: 'El email ingresado no es válido.' })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada en las variables de entorno.')
      return res.status(500).json({ ok: false, error: 'El servidor no está configurado correctamente.' })
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'trasladosconexperiencia@gmail.com'
    const serviceLabel = SERVICE_LABELS[servicio] || servicio
    const emailData = { nombre, email, telefono, serviceLabel, fecha, mensaje }

    const { data, error } = await resend.emails.send({
      from: 'Web Traslados <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `Nueva consulta de ${nombre} — ${serviceLabel}`,
      html: buildEmailHtml(emailData),
      text: buildEmailText(emailData),
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error))
      const isDomainRestriction = error.message?.includes('own email address') || error.statusCode === 403
      const friendlyError = isDomainRestriction
        ? 'Resend bloqueó el envío: con el remitente de prueba (onboarding@resend.dev) solo se puede enviar al email con el que te registraste en Resend. Verificá un dominio en resend.com/domains para enviar a cualquier destinatario.'
        : (error.message || 'No se pudo enviar el email.')
      return res.status(502).json({ ok: false, error: friendlyError })
    }

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('send-email handler error:', err)
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' })
  }
}
