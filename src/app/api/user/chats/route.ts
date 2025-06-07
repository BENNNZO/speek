import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Chat {
    id: string,
    createdAt: Date,
    ownerId: string
}

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) return new NextResponse("Unauthorized", { status: 400 })

        const chats: Chat[] = await prisma.chat.findMany({
            where: { ownerId: session.user.id },
            take: 10
        })

        return NextResponse.json(chats.map((chat: Chat) => chat.id), { status: 200 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error"
        return new NextResponse(errorMessage, { status: 400 })
    }
}