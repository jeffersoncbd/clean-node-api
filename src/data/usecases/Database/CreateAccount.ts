import {
  CreateAccount,
  CreateAccountDTO,
  AccountEntity,
  Encrypter,
  CreateAccountRepository
} from './CreateAccount.protocols'

export class DatabaseCreateAccountUseCase implements CreateAccount {
  constructor(
    private encrypter: Encrypter,
    private createAccountRepository: CreateAccountRepository
  ) {}

  async create(accountData: CreateAccountDTO): Promise<AccountEntity> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    const account = await this.createAccountRepository.create({
      ...accountData,
      password: hashedPassword
    })

    return account
  }
}
