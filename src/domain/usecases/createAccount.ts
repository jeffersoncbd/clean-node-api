import { AccountEntity } from '../entities/Account'

export interface CreateAccountDTO {
  name: string
  email: string
  password: string
}

export interface CreateAccount {
  create: (account: CreateAccountDTO) => Promise<AccountEntity>
}
