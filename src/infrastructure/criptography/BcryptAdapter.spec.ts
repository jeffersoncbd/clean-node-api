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

  test('Deve retornar o hash com sucesso', async () => {
    const { systemUnderTest } = makeSystemUnderTest()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return 'hash_value'
    })

    const hash = await systemUnderTest.encrypt('any_value')

    expect(hash).toBe('hash_value')
  })

  test('Deve relançar erro se bcrypt.hash lançar erro', async () => {
    const { systemUnderTest } = makeSystemUnderTest()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      throw new Error()
    })

    const promise = systemUnderTest.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
