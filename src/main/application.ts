import { ExpressServer } from './server'
import { mongoConnectionHelper } from '../infrastructure/database/mongodb/helpers/connection'
import { env } from './env'

async function root() {
  try {
    await mongoConnectionHelper.connect(env.mongoUrl)

    const server = new ExpressServer()
    server.listen()
  } catch (error) {
    console.log('[application.ts] - ERROR')
    console.log()
    console.error(error)
    console.log()
  }
}

root()
