import {
  CreateAccount,
  CreateAccountTDO
} from '../../../domain/usecases/createAccount'
import { AccountEntity } from '../../../domain/entities/Account'
import { Encrypter } from '../../protocols/encrypter'

export class DatabaseCreateAccountUseCase implements CreateAccount {
  constructor(private encrypter: Encrypter) {}

  async create(account: CreateAccountTDO): Promise<AccountEntity> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return { id: '', password: hashedPassword, name: '', email: '' }
  }
}
