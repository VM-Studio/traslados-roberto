import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Middleware de desarrollo: permite que `npm run dev` ejecute las funciones
// serverless de /api (como send-email.js) sin necesidad de `vercel dev`.
// En producción (Vercel) estas mismas funciones corren de forma nativa.
function apiDevMiddleware() {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/send-email', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            req.body = {}
          }
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }
          try {
            const mod = await server.ssrLoadModule('/api/send-email.js')
            await mod.default(req, res)
          } catch (err) {
            console.error('[api/send-email] dev error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Error interno (dev).' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga todas las variables de .env (sin exigir el prefijo VITE_) al
  // process.env del propio servidor de Vite, para que api/send-email.js
  // pueda leer RESEND_API_KEY / CONTACT_TO_EMAIL en modo desarrollo.
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), apiDevMiddleware()],
  }
})
