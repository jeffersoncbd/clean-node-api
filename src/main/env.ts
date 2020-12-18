export const env = {
  serverPort: process.env.SERVER_PORT || 3001,
  mongoUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api_DEV'
}
