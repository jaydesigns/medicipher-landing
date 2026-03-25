import { Groq } from 'groq-sdk'
import { NextResponse } from 'next/server'
import { vectorSearch } from '@/app/action'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY' }, { status: 500 })
    }

    const body = (await request.json()) as { prompt?: string }
    const prompt = body.prompt?.trim() ?? ''

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Vector search to get context for response refinement
    const contextPrompt = await vectorSearch({ query: prompt })

    const combinedPrompt = `Please answer the user question using the context from vector search. If the context is incomplete, complete using your general knowledge, but prefer context-sourced details.\n\n${contextPrompt}`

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant providing short, clear answers.' },
        { role: 'user', content: combinedPrompt },
      ],
      model: 'openai/gpt-oss-120b',
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: true,
      reasoning_effort: 'medium',
      stop: null,
    })

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatCompletion) {
            const text = chunk?.choices?.[0]?.delta?.content
            if (typeof text === 'string' && text.length > 0) {
              controller.enqueue(new TextEncoder().encode(text))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Error in groq-chat API:', error)
    return NextResponse.json({ error: 'Failed to get completion' }, { status: 500 })
  }
}
