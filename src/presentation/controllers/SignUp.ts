import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/MissingParameterError'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new MissingParameterError('name') }
    }

    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new MissingParameterError('email') }
    }

    return { statusCode: 200, body: '' }
  }
}
