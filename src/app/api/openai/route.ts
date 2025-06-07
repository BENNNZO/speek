import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { openai } from "@ai-sdk/openai";
import { Message, streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user) return new NextResponse("Unauthorized", { status: 400 })

    const { messages, model, prompt, id }: { messages: Message[], model: string, prompt: string, id: string } = await req.json()
    if (!model) return new NextResponse("No model provided in body of request", { status: 400 })

    const result = streamText({
        model: openai(model),
        messages,
        onFinish: async ({ text }) => {
            const chatExists = await prisma.chat.findUnique({ where: { id } })

            if (chatExists) {
                const owned = chatExists?.ownerId === session?.user?.id

                if (owned) {
                    await prisma.message.createMany({
                        data: [
                            {
                                role: "user",
                                content: prompt,
                                chatId: id
                            },
                            {
                                role: "assistant",
                                content: text,
                                chatId: id
                            }
                        ],
                    })
                }
            } else {
                await prisma.chat.create({
                    data: {
                        id,
                        ownerId: session?.user?.id ?? "unknown",
                        messages: {
                            createMany: {
                                data: [
                                    {
                                        role: "user",
                                        content: prompt,
                                    },
                                    {
                                        role: "assistant",
                                        content: text,
                                    }
                                ],
                            }
                        },
                    }
                })
            }
        }
    })

    return result.toDataStreamResponse({ sendReasoning: true })
}