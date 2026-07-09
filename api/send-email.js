import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

function buildEmailHtml({ nombre, email, telefono, serviceLabel, fecha, mensaje }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;font-weight:bold;width:150px;color:#0A0A0A;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;color:#1a1a1a;">${value}</td>
    </tr>`

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto;">
      <div style="border-bottom: 2px solid #C9A96E; padding-bottom: 16px; margin-bottom: 20px;">
        <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #C9A96E; margin: 0 0 4px;">Traslados con experiencia</p>
        <h2 style="margin: 0; color: #0A0A0A; font-size: 22px;">Nueva consulta desde la web</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row('Nombre', escapeHtml(nombre))}
        ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#0A0A0A;">${escapeHtml(email)}</a>`)}
        ${row('Teléfono', telefono ? escapeHtml(telefono) : '—')}
        ${row('Servicio', escapeHtml(serviceLabel))}
        ${row('Fecha', fecha ? escapeHtml(fecha) : '—')}
      </table>
      <div style="margin-top: 20px;">
        <p style="font-weight: bold; margin: 0 0 8px; font-size: 14px; color: #0A0A0A;">Mensaje</p>
        <p style="white-space: pre-wrap; background: #F5F0EB; padding: 14px 18px; border-left: 3px solid #C9A96E; margin: 0; font-size: 14px; color: #1a1a1a;">${mensaje ? escapeHtml(mensaje) : '—'}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #6B6B6B;">Podés responder directamente a este email para contactar a ${escapeHtml(nombre)}.</p>
    </div>
  `
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

    const { data, error } = await resend.emails.send({
      from: 'Web Traslados <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `Nueva consulta de ${nombre} — ${serviceLabel}`,
      html: buildEmailHtml({ nombre, email, telefono, serviceLabel, fecha, mensaje }),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ ok: false, error: error.message || 'No se pudo enviar el email.' })
    }

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('send-email handler error:', err)
    return res.status(500).json({ ok: false, error: 'Error interno del servidor.' })
  }
}
