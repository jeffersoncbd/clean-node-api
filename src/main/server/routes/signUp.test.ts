import request from 'supertest'
import { Express } from 'express'
import { ExpressServer } from '..'
import { mongoConnectionHelper } from '../../../infrastructure/database/mongodb/helpers/connection'

describe('signUpRoute', () => {
  let expressServer: Express

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL não está disponível')
    }
    await mongoConnectionHelper.connect(process.env.MONGO_URL)
    expressServer = new ExpressServer().expressServer
  })
  afterAll(async () => {
    await mongoConnectionHelper.disconnect()
  })

  beforeEach(async () => {
    const accountsCollection = mongoConnectionHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  test('Deve existir uma rota /signup', async () => {
    const response = await request(expressServer).post('/signup')

    expect(response.status).not.toBe(404)
  })
})
