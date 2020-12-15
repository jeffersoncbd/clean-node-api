import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/MissingParameterError'
import { badRequest } from '../helpers/httpHelpers'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParameterError(field))
      }
    }

    return { statusCode: 200, body: '' }
  }
}
