import { NextResponse } from 'next/server'
import { mongoClientPromise } from '@/lib/mongodb'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as { name?: string; email?: string }

        const name = body.name?.trim()
        const email = body.email?.trim().toLowerCase()

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
        }

        const client = await mongoClientPromise
        const dbName = process.env.MONGODB_DB ?? 'medicipher'
        const collectionName = process.env.MONGODB_COLLECTION ?? 'leads'

        const db = client.db(dbName)
        await db.collection(collectionName).insertOne({
            name,
            email,
            createdAt: new Date(),
        })

        return NextResponse.json({ ok: true }, { status: 201 })
    } catch {
        return NextResponse.json({ error: 'Failed to save lead.' }, { status: 500 })
    }
}
