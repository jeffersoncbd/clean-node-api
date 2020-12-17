import { DatabaseCreateAccountUseCase } from './CreateAccount'
import { Encrypter } from '../../protocols/encrypter'

function makeEncrypterStub() {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

function makeSystemUnderTest() {
  const encrypterStub = makeEncrypterStub()
  const systemUnderTest = new DatabaseCreateAccountUseCase(encrypterStub)
  return { systemUnderTest, encrypterStub }
}

describe('DatabaseCreateAccountUseCase', () => {
  test('Deve chamar Encrypter with correct password', async () => {
    const { systemUnderTest, encrypterStub } = makeSystemUnderTest()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await systemUnderTest.create({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })

    expect(encryptSpy).toHaveBeenLastCalledWith('valid_password')
  })

  test('Deve lançar erro se Encrypter lançar algum erro', async () => {
    const { systemUnderTest, encrypterStub } = makeSystemUnderTest()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      throw new Error()
    })

    const promise = systemUnderTest.create({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })

    await expect(promise).rejects.toThrow()
  })
})
