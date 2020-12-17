import { CreateAccountRepository } from '../../../../data/protocols/repositories/CreateAccount'
import { AccountEntity } from '../../../../domain/entities/Account'
import { CreateAccountTDO } from '../../../../domain/usecases/createAccount'
import { Collection } from 'mongodb'
import { mongoConnectionHelper } from '../helpers/connection'

export class AccountMongoDBRepository implements CreateAccountRepository {
  private accountCollections: Collection

  constructor() {
    this.accountCollections = mongoConnectionHelper.getCollection('accounts')
  }

  async create(accountData: CreateAccountTDO): Promise<AccountEntity> {
    const account = await this.accountCollections.insertOne(accountData)
    const { _id, ...fields } = account.ops[0]
    return { id: _id, ...fields }
  }
}
