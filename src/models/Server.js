import express from 'express'
import cors from 'cors'
import {
  prefix as FilesPrefix,
  router as Filesrouter
} from '../routes/files.js'
import { PORT } from '../config/server.js'

class Server {
  constructor () {
    this.app = express()
    this.port = PORT

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes () {
    this.app.use(`${FilesPrefix}`, Filesrouter)

    this.app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server runing on port', this.port)
    })
  }
}

export default Server
