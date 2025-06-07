import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Message {
    id: string,
    content: string,
    role: string,
    createdAt: Date
}

export async function GET(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 400 })

        const { chatId } = await params

        const messages: Message[] = await prisma.message.findMany({
            where: { chatId },
            take: 10
        })

        return NextResponse.json(messages, { status: 200 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error"
        return new NextResponse(errorMessage, { status: 400 })
    }
}