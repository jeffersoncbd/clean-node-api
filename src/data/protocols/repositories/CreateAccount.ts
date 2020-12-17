import { CreateAccountDTO } from '../../../domain/usecases/createAccount'
import { AccountEntity } from '../../../domain/entities/Account'

export interface CreateAccountRepository {
  create: (account: CreateAccountDTO) => Promise<AccountEntity>
}
