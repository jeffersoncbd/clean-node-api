import { LogErrorRepository } from '../../../../../data/protocols/repositories/LogError'
import { mongoConnectionHelper } from '../../helpers/connection'

export class LogErrorMongoDBRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    const errorsCollection = mongoConnectionHelper.getCollection<{
      stack: string
      date: Date
    }>('errors')
    await errorsCollection.insertOne({ stack, date: new Date() })
  }
}
