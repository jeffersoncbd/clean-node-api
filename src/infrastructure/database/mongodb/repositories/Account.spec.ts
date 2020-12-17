import { mongoConnectionHelper } from '../helpers/connection'
import { AccountMongoDBRepository } from './Account'

function makeSystemUnderTest() {
  const systemUnderTest = new AccountMongoDBRepository()
  return { systemUnderTest }
}

describe('AccountMongoDBRepository', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL não está disponível')
    }
    await mongoConnectionHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await mongoConnectionHelper.disconnect()
  })

  beforeEach(async () => {
    const accountsCollection = mongoConnectionHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  test('Deve retornar a conta criada quando ter sucesso', async () => {
    const { systemUnderTest } = makeSystemUnderTest()

    const account = await systemUnderTest.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
