import express from 'express'

const server = express()

server.listen(3001, () => console.log(`Servidor iniciado na porta ${3001}`))
