import { openai } from "@ai-sdk/openai";
import { Message, streamText } from "ai";

export const maxDuration = 30

export async function POST(req: Request) {
    const { messages, model }: { messages: Message[], model: string } = await req.json()

    if (!model) return new Response("No model provided in body of request", { status: 400 })

    const result = streamText({
        // gpt-4.1-nano    // $0.10/m
        // gpt-4o-mini     // $0.15/m
        // o4-mini         // $1.10/m
        model: openai(model),
        messages,
    })

    return result.toDataStreamResponse({ sendReasoning: true })
}