import { SignUpController } from './SignUp'
import {
  EmailValidator,
  CreateAccount,
  AccountEntity
} from './signup.protocols'
import {
  MissingParameterError,
  InvalidParameterError,
  ServerError
} from '../../errors'

interface MakeSystemUnderTestReturns {
  systemUnderTest: SignUpController
  emailValidatorStub: EmailValidator
  createAccountStub: CreateAccount
}

function makeEmailValidator(): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid(): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

function makeCreateAccount(): CreateAccount {
  class CreateAccountStub implements CreateAccount {
    create(): AccountEntity {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }

  return new CreateAccountStub()
}

function makeSystemUnderTest(): MakeSystemUnderTestReturns {
  const emailValidatorStub = makeEmailValidator()
  const createAccountStub = makeCreateAccount()
  const systemUnderTest = new SignUpController(
    emailValidatorStub,
    createAccountStub
  )
  return { systemUnderTest, emailValidatorStub, createAccountStub }
}

describe('SignUpController', () => {
  test('Deve retornar 400 se o nome não for enviado', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParameterError('name'))
  })

  test('Deve retornar 400 se o email não for enviado', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParameterError('email'))
  })

  test('Deve retornar 400 se o password não for enviado', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParameterError('password'))
  })

  test('Deve retornar 400 se o passwordConfirmation não for enviado', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParameterError('passwordConfirmation')
    )
  })

  test('Deve retornar 400 se o password for diferente do passwordConfirmation', () => {
    const { systemUnderTest } = makeSystemUnderTest()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new InvalidParameterError('passwordConfirmation')
    )
  })

  test('Deve retornar 400 se o email enviado for inválido', () => {
    const { systemUnderTest, emailValidatorStub } = makeSystemUnderTest()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParameterError('email'))
  })

  test('Deve chamar o emailValidator com o e-mail correto', () => {
    const { systemUnderTest, emailValidatorStub } = makeSystemUnderTest()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    systemUnderTest.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Deve retornar 500 se o emailValidator lançar error', () => {
    const { systemUnderTest, emailValidatorStub } = makeSystemUnderTest()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Deve chamar o createAccount com os dados corretos', () => {
    const { systemUnderTest, createAccountStub } = makeSystemUnderTest()
    const createSpy = jest.spyOn(createAccountStub, 'create')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    systemUnderTest.handle(httpRequest)

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Deve retornar 500 se o createAccount lançar error', () => {
    const { systemUnderTest, createAccountStub } = makeSystemUnderTest()
    jest.spyOn(createAccountStub, 'create').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Deve retornar 201 se todos os dados forem válidos', () => {
    const { systemUnderTest } = makeSystemUnderTest()

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_mail@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }

    const httpResponse = systemUnderTest.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({ id: 'valid_id' })
  })
})
