import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../../presentation/protocols'
import { LogErrorRepository } from '../../../data/protocols/repositories/LogError'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      this.logErrorRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
