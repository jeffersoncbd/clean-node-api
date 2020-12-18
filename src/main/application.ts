import { expressServer } from './server'

expressServer.listen(3001, () =>
  console.log(`Servidor iniciado na porta ${3001}`)
)
