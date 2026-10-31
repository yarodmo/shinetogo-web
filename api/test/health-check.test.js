// bliss-one es un VPS compartido: el health check del deploy debe exigir el nombre de ESTE servicio. Un 200 a secas
// aprobaba la API de otro cliente que ocupaba el mismo puerto (Nails y Shine To Go salieron verdes asi hasta 2026-10-31).
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const root = join(__dirname, '..', '..')
const deploy = readFileSync(join(root, '.github', 'workflows', 'deploy.yml'), 'utf8')

test('el health check del deploy exige "service":"shinetogo-api"', () => {
  assert.match(deploy, /grep -q '"service":"shinetogo-api"'/)
  assert.doesNotMatch(deploy, /-o \/dev\/null -w "%\{http_code\}"[^\n]*\/api\/health/, 'nada de aprobar solo por el codigo HTTP')
})

test('el nombre que exige el deploy es el que devuelve /api/health', () => {
  const src = ['server.js', 'app.js'].map((f) => { try { return readFileSync(join(root, 'api', f), 'utf8') } catch { return '' } }).join('\n')
  assert.match(src, /service: 'shinetogo-api'/)
})
