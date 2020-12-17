import { DatabaseCreateAccountUseCase } from './CreateAccount'
import {
  Encrypter,
  AccountEntity,
  CreateAccountRepository
} from './CreateAccount.protocols'

function makeEncrypterStub() {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

function makeCreateAccountRepositoryStub() {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create(): Promise<AccountEntity> {
      const fakeAccount: AccountEntity = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return fakeAccount
    }
  }
  return new CreateAccountRepositoryStub()
}

function makeSystemUnderTest() {
  const encrypterStub = makeEncrypterStub()
  const createAccountRepositoryStub = makeCreateAccountRepositoryStub()
  const systemUnderTest = new DatabaseCreateAccountUseCase(
    encrypterStub,
    createAccountRepositoryStub
  )
  return { systemUnderTest, encrypterStub, createAccountRepositoryStub }
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

  test('Deve chamar CreateAccountRepository com a senha correta', async () => {
    const {
      systemUnderTest,
      createAccountRepositoryStub
    } = makeSystemUnderTest()
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create')

    await systemUnderTest.create({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })

    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Deve lançar erro se CreateAccountRepository lançar algum erro', async () => {
    const {
      systemUnderTest,
      createAccountRepositoryStub
    } = makeSystemUnderTest()
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockImplementationOnce(async () => {
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
