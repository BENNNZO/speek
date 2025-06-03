import { UIMessage } from "ai"
import Image from "next/image";
import Message from "./Message";

export default function Messages({ messages, status, reloadFunction, editFunction }: { messages: UIMessage[], status: string, reloadFunction: (id: string) => void, editFunction: (id: string, content: string) => void }) {

    return (
        <div className="flex flex-col gap-8 mx-auto pb-32 max-w-4xl">
            {messages.map((message) => (
                <Message key={message.id} message={message} reloadFunction={reloadFunction} editFunction={editFunction} />
            ))}
            {status === "submitted" && <Image src="/loader.svg" width={35} height={35} alt="loader" />}
        </div>
    )
}