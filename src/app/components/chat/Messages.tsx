import { UIMessage } from "ai"
import Image from "next/image";
import Message from "./Message";

export default function Messages({ messages, status }: { messages: UIMessage[], status: string }) {

    return (
        <div className="flex flex-col gap-4 mx-auto pb-32 max-w-4xl">
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            {status === "submitted" && <Image src="/loader.svg" width={35} height={35} alt="loader" />}
        </div>
    )
}