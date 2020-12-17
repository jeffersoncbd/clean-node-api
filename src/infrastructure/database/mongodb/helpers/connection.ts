import { MongoClient, Collection } from 'mongodb'

class MongoConnectionHelper {
  client?: MongoClient

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  }

  getCollection<T>(name: string): Collection<T> {
    if (!this.client) {
      throw new Error('Cliente mongoDB não foi conectado')
    }

    return this.client.db().collection<T>(name)
  }
}

export const mongoConnectionHelper = new MongoConnectionHelper()
