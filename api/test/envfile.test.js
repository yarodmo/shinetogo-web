'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { execFileSync, spawnSync } = require('node:child_process')
const path = require('node:path')
const dotenv = require('dotenv')
const { formatEnv } = require('../lib/envfile')

const CLI = path.join(__dirname, '..', '..', 'scripts', 'write-env.cjs')

test('el .env generado se lee con dotenv exactamente igual al valor original', () => {
  const tricky = [
    'plain', 'Pa$s1word!x', 'abc#def', 'with "double" quotes', "it's here", 'back`tick', '$(id -un)', '${HOME}', 'a b  c', 'ñandú ✓', '\\n literal',
  ]
  for (const value of tricky) {
    const parsed = dotenv.parse(formatEnv([['SMTP_PASS', value]]))
    assert.equal(parsed.SMTP_PASS, value, `valor: ${value}`)
  }
})

test('rechaza lo que no se puede escribir sin corromperlo', () => {
  assert.throws(() => formatEnv([['A', 'dos\nlíneas']]), /saltos de línea/)
  assert.throws(() => formatEnv([['A', "ambas ' y `"]]), /mezcla/)
  assert.throws(() => formatEnv([['bad-name', 'x']]), /inválido/)
})

test('un valor vacío queda vacío', () => {
  assert.equal(dotenv.parse(formatEnv([['BRAND_NAME', '']])).BRAND_NAME, '')
})

const baseEnv = {
  PATH: process.env.PATH, PORT: '6016', SMTP_HOST: 'mail.example.com', SMTP_PORT: '465', SMTP_USER: 'a@example.com',
  SMTP_PASS: "p#a$s'w\"d", RECIPIENT: 'owner@example.com', ALLOWED_ORIGINS: 'https://example.com,https://www.example.com',
}

test('write-env.cjs: genera un .env que dotenv lee igual, con NODE_ENV=production', () => {
  const out = execFileSync('node', [CLI], { env: { ...baseEnv, BRAND_NAME: 'ShineToGo' } }).toString()
  const parsed = dotenv.parse(out)
  assert.equal(parsed.NODE_ENV, 'production')
  assert.equal(parsed.SMTP_PASS, baseEnv.SMTP_PASS)
  assert.equal(parsed.ALLOWED_ORIGINS, baseEnv.ALLOWED_ORIGINS)
  assert.equal(parsed.BRAND_NAME, 'ShineToGo')
})

test('write-env.cjs: falla si falta una variable o ALLOWED_ORIGINS trae barra final', () => {
  const noPass = spawnSync('node', [CLI], { env: { ...baseEnv, SMTP_PASS: '' } })
  assert.notEqual(noPass.status, 0)
  assert.match(noPass.stderr.toString(), /SMTP_PASS/)
  const slash = spawnSync('node', [CLI], { env: { ...baseEnv, ALLOWED_ORIGINS: 'https://example.com/' } })
  assert.notEqual(slash.status, 0)
  assert.match(slash.stderr.toString(), /ALLOWED_ORIGINS/)
})
