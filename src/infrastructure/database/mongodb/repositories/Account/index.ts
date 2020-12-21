import { CreateAccountRepository } from '../../../../../data/protocols/repositories/CreateAccount'
import { AccountEntity } from '../../../../../domain/entities/Account'
import { CreateAccountDTO } from '../../../../../domain/usecases/createAccount'
import { Collection } from 'mongodb'
import { mongoConnectionHelper } from '../../helpers/connection'

export class AccountMongoDBRepository implements CreateAccountRepository {
  private accountCollections: Collection<CreateAccountDTO>

  constructor() {
    this.accountCollections = mongoConnectionHelper.getCollection<CreateAccountDTO>(
      'accounts'
    )
  }

  async create(accountData: CreateAccountDTO): Promise<AccountEntity> {
    const account = await this.accountCollections.insertOne(accountData)
    const { _id, ...fields } = account.ops[0]
    return { id: _id.toHexString(), ...fields }
  }
}
