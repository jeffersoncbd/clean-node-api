import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

function makeSystemUnderTest() {
  const salt = 12
  const systemUnderTest = new BcryptAdapter(salt)
  return { systemUnderTest, salt }
}

describe('BcryptAdapter', () => {
  test('Deve chamar o bcrypt com o valor correto', async () => {
    const { systemUnderTest, salt } = makeSystemUnderTest()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await systemUnderTest.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
