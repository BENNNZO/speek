import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30

export async function POST(req: Request) {
    const { messages } = await req.json()

    const result = streamText({
        model: openai("gpt-4.1-nano"),    // $0.10/m
        // model: openai("gpt-4o-mini"),     // $0.15/m
        // model: openai("o4-mini"),            // $1.10/m
        messages,
    })

    return result.toDataStreamResponse({ sendReasoning: true })
}