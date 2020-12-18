import request from 'supertest'
import { expressServer } from '..'

describe('signUpRoute', () => {
  test('Deve existir uma rota /signup', async () => {
    const response = await request(expressServer).post('/signup')

    expect(response.status).not.toBe(404)
  })
})
