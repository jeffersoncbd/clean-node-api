import { AccountEntity } from '../entities/Account'

export interface CreateAccountTDO {
  name: string
  email: string
  password: string
}

export interface CreateAccount {
  create: (account: CreateAccountTDO) => AccountEntity
}
