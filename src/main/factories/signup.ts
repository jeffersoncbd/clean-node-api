import { SignUpController } from '../../presentation/controllers/SignUp/SignUp'
import { EmailValidatorAdapter } from '../../utils/emailValidator/Adapter'
import { DatabaseCreateAccountUseCase } from '../../data/usecases/Database/CreateAccount'
import { BcryptAdapter } from '../../infrastructure/criptography/BcryptAdapter'
import { AccountMongoDBRepository } from '../../infrastructure/database/mongodb/repositories/Account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../../infrastructure/decorators/LogController'

export function makeSignUpController(): Controller {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoDBRepository = new AccountMongoDBRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const databaseCreateAccountUseCase = new DatabaseCreateAccountUseCase(
    bcryptAdapter,
    accountMongoDBRepository
  )

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    databaseCreateAccountUseCase
  )

  const logControllerDecorator = new LogControllerDecorator(signUpController)

  return logControllerDecorator
}
