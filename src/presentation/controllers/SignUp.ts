import { MissingParameterError, InvalidParameterError } from '../errors'
import { badRequest, serverError } from '../helpers/httpHelpers'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator
} from '../protocols'

export class SignUpController implements Controller {
  constructor(private emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
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
    } catch (error) {
      return serverError()
    }
  }
}
