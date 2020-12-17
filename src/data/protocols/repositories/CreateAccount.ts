import { CreateAccountTDO } from '../../../domain/usecases/createAccount'
import { AccountEntity } from '../../../domain/entities/Account'

export interface CreateAccountRepository {
  create: (account: CreateAccountTDO) => Promise<AccountEntity>
}
