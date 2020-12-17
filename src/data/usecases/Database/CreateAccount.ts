import {
  CreateAccount,
  CreateAccountTDO,
  AccountEntity,
  Encrypter
} from './CreateAccount.protocols'

export class DatabaseCreateAccountUseCase implements CreateAccount {
  constructor(private encrypter: Encrypter) {}

  async create(account: CreateAccountTDO): Promise<AccountEntity> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return { id: '', password: hashedPassword, name: '', email: '' }
  }
}
