import { SignUpController } from './SignUp'
import { EmailValidator } from '../protocols'
import {
  MissingParameterError,
  InvalidParameterError,
  ServerError
} from '../errors'

interface MakeSystemUnderTestReturns {
  systemUnderTest: SignUpController
  emailValidatorStub: EmailValidator
}

function makeEmailValidator(): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid(): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

function makeSystemUnderTest(): MakeSystemUnderTestReturns {
  const emailValidatorStub = makeEmailValidator()
  const systemUnderTest = new SignUpController(emailValidatorStub)
  return { systemUnderTest, emailValidatorStub }
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

  test('Deve retornar 500 se o emailValidator throws error', () => {
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
})
