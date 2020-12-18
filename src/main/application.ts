import { expressServer } from './server'
import { mongoConnectionHelper } from '../infrastructure/database/mongodb/helpers/connection'
import { env } from './env'

async function root() {
  try {
    await mongoConnectionHelper.connect(env.mongoUrl)

    expressServer.listen(env.serverPort, () =>
      console.log(`Servidor iniciado na porta ${env.serverPort}`)
    )
  } catch (error) {
    console.log('[application.ts] - ERROR')
    console.log()
    console.error(error)
    console.log()
  }
}

root()
