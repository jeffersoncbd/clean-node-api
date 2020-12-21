import { LogControllerDecorator } from '.'
import {
  Controller,
  HttpResponse,
  HttpRequest
} from '../../../presentation/protocols'

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

function makeSystemUnderTest() {
  const controllerSub = makeControllerSub()
  const systemUnderTest = new LogControllerDecorator(controllerSub)
  return { systemUnderTest, controllerSub }
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
})
