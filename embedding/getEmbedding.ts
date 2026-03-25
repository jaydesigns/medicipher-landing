import { GoogleGenAI } from "@google/genai"

// Function to generate embeddings for a given data source
export async function getEmbedding(data: string): Promise<number[]> {
  if (!data) {
    throw new Error('Data is required for embedding generation')
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set')
  }

  const ai = new GoogleGenAI({ apiKey })
  const results = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: data,
  })

  const values = results.embeddings?.[0]?.values
  if (!values || !Array.isArray(values)) {
    throw new Error('Embedding response does not contain values')
  }

  return Array.from(values)
}