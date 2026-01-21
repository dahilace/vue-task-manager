import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const delay = 1000

server.get('/', (req, res) => {
  res.json(router.db.getState())
})

server.use((req, res, next) => {
  setTimeout(next, delay)
})

server.use(middlewares)
server.use(router)

server.listen(3001, () => {
  console.log('JSON SERVER RUNNING WITH DELAY: ' + delay + 'ms')
})
