import { LogControllerDecorator } from '.'
import {
  Controller,
  HttpResponse,
  HttpRequest
} from '../../../presentation/protocols'
import { serverError } from '../../../presentation/helpers/httpHelpers'
import { LogErrorRepository } from '../../../data/protocols/repositories/LogError'

function makeControllerSub() {
  class ControllerSub implements Controller {
    async handle(): Promise<HttpResponse> {
      return {
        statusCode: 200,
        body: {
          feedback: 'OK'
        }
      }
    }
  }

  return new ControllerSub()
}

function makeLogErrorRepositoryStub() {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(): Promise<void> {
      return undefined
    }
  }
  return new LogErrorRepositoryStub()
}

function makeSystemUnderTest() {
  const controllerSub = makeControllerSub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const systemUnderTest = new LogControllerDecorator(
    controllerSub,
    logErrorRepositoryStub
  )
  return { systemUnderTest, controllerSub, logErrorRepositoryStub }
}

describe('LogControllerDecorator', () => {
  test('Deve chamar controller.handle', async () => {
    const { systemUnderTest, controllerSub } = makeSystemUnderTest()
    const handleSpy = jest.spyOn(controllerSub, 'handle')

    const httpRequest: HttpRequest = { body: {} }
    await systemUnderTest.handle(httpRequest)

    expect(handleSpy).toBeCalledWith(httpRequest)
  })

  test('Deve retornar o objeto retornado pelo controller.handle', async () => {
    const { systemUnderTest } = makeSystemUnderTest()

    const httpRequest: HttpRequest = { body: {} }
    const httpResponse = await systemUnderTest.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        feedback: 'OK'
      }
    })
  })

  test('Deve chamar LogErrorRepository com o erro correto se controller.handle retornar um ServerError', async () => {
    const {
      systemUnderTest,
      controllerSub,
      logErrorRepositoryStub
    } = makeSystemUnderTest()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest
      .spyOn(controllerSub, 'handle')
      .mockImplementation(async () => serverError(fakeError))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    const httpRequest: HttpRequest = { body: {} }
    await systemUnderTest.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
