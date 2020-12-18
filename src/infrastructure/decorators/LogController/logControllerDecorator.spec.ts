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
        body: {}
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
  test('Deve chamar this.controller.handle', async () => {
    const { systemUnderTest, controllerSub } = makeSystemUnderTest()
    const handleSpy = jest.spyOn(controllerSub, 'handle')

    const httpRequest: HttpRequest = { body: {} }
    await systemUnderTest.handle(httpRequest)

    expect(handleSpy).toBeCalledWith(httpRequest)
  })
})
