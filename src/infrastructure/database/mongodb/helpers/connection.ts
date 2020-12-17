import { MongoClient } from 'mongodb'

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
}

export const mongoConnectionHelper = new MongoConnectionHelper()
