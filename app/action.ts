'use server'

import { getEmbedding } from "@/embedding/getEmbedding";
import { MongoClient } from "mongodb";

const client = new MongoClient(`${process.env.VECTOR_EMBEDDING}`);

export async function vectorSearch({query}:{query:string}) {
  const queryEmbedding = await getEmbedding(`${query}`);
    
  // console.log("Query EMbedding",queryEmbedding);
  
  const db = client.db('knowledge-base');
  const collection = db.collection('embeddings');
  const results = await collection.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: 'embedding',
        numCandidates: 3,
        limit: 2,
        index: 'vector_index'
      }
    }
  ]).toArray();

  const context = results.map(r => r.text).join('\n');

//   console.log("Context",context);
  const prompt = `
  Use the context below to answer the question in a concise, witty, yet professional manner.
  Context:
  ${context}

  Question: ${query}
  `;

  return prompt
}