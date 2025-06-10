import ClientContainer from "@/components/chat/ClientContainer"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ChatPage() {
    const session = await auth()

    if (!session?.user) redirect("/auth")

    return (
        <ClientContainer />
    )
}