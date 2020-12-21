import { mongoConnectionHelper } from '../../helpers/connection'
import { LogErrorMongoDBRepository } from '.'
import { Collection } from 'mongodb'

function makeSystemUnderTest() {
  const systemUnderTest = new LogErrorMongoDBRepository()
  return { systemUnderTest }
}

describe('LogErrorMongoDBRepository', () => {
  let errorsCollection: Collection

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
    errorsCollection = mongoConnectionHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  test('Deve salvar um Error no banco de dados', async () => {
    const { systemUnderTest } = makeSystemUnderTest()
    await systemUnderTest.log('any_error')

    const count = await errorsCollection.countDocuments()

    expect(count).toBe(1)
  })
})
