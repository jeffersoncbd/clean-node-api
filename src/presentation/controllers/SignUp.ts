import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/MissingParameterError'
import { badRequest } from '../helpers/httpHelpers'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParameterError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }

    return { statusCode: 200, body: '' }
  }
}
