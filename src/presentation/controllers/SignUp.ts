import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/MissingParameterError'
import { badRequest } from '../helpers/httpHelpers'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParameterError } from '../errors/InvalidParameterError'

export class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParameterError(field))
      }
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!emailIsValid) {
      return badRequest(new InvalidParameterError('email'))
    }

    return { statusCode: 200, body: '' }
  }
}
