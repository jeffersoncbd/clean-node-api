import {
  CreateAccount,
  CreateAccountTDO,
  AccountEntity,
  Encrypter,
  CreateAccountRepository
} from './CreateAccount.protocols'

export class DatabaseCreateAccountUseCase implements CreateAccount {
  constructor(
    private encrypter: Encrypter,
    private createAccountRepository: CreateAccountRepository
  ) {}

  async create(accountData: CreateAccountTDO): Promise<AccountEntity> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    const account = await this.createAccountRepository.create({
      ...accountData,
      password: hashedPassword
    })

    return account
  }
}
