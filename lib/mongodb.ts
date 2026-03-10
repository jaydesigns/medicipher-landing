import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI ?? process.env.MONGODB_URL

if (!uri) {
    throw new Error('Missing MongoDB connection string. Set MONGODB_URI in your environment variables.')
}

type GlobalWithMongo = typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
}

const globalWithMongo = globalThis as GlobalWithMongo

const client = new MongoClient(uri)

export const mongoClientPromise =
    globalWithMongo._mongoClientPromise ?? (globalWithMongo._mongoClientPromise = client.connect())
