import assert from 'node:assert/strict'
import { test } from 'node:test'
import { preview } from 'vite'

test('the production UI serves its entry point and JavaScript on a deep link', async () => {
  const server = await preview({ configFile: false, preview: { host: '127.0.0.1', port: 0 } })
  try {
    const origin = `http://127.0.0.1:${server.httpServer.address().port}`
    const entry = await fetch(new URL('/login', origin))
    assert.equal(entry.status, 200)
    assert.match(entry.headers.get('content-type'), /text\/html/)
    const html = await entry.text()
    assert.match(html, /id="app"/)
    const script = html.match(/<script\b[^>]*\bsrc="([^"]+)"/)
    assert.ok(script, 'Vite entry bundle is referenced in the HTML')
    const bundle = await fetch(new URL(script[1], origin))
    assert.equal(bundle.status, 200)
    assert.match(bundle.headers.get('content-type'), /javascript/)
    assert.ok((await bundle.text()).length > 0)
  } finally {
    await new Promise((resolve, reject) => {
      server.httpServer.close(error => error ? reject(error) : resolve())
    })
  }
})
