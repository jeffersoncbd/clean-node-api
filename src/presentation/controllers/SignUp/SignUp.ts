import { MissingParameterError, InvalidParameterError } from '../../errors'
import {
  badRequest,
  serverError,
  creationRequestSuccess
} from '../../helpers/httpHelpers'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  CreateAccount
} from './signup.protocols'

export class SignUpController implements Controller {
  constructor(
    private emailValidator: EmailValidator,
    private createAccount: CreateAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const { name, email, password, passwordConfirmation } = httpRequest.body

      const emailIsValid = this.emailValidator.isValid(email)
      if (!emailIsValid) {
        return badRequest(new InvalidParameterError('email'))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParameterError('passwordConfirmation'))
      }

      const account = await this.createAccount.create({
        name,
        email,
        password
      })

      return creationRequestSuccess({ id: account.id })
    } catch (error) {
      return serverError()
    }
  }
}
