// const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// const app = express()
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
      console.log(data)
      io.emit('MESSAGE', data)
    })
  })
}
start()
