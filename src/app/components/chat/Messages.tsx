import { UIMessage } from "ai"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Messages({ messages }: { messages: UIMessage[] }) {
    return (
        <div className="flex flex-col gap-4 mx-auto pb-32 max-w-4xl">
            {messages.map((message) => {
                switch (message.role) {
                    case "user":
                        return (
                            <p key={message.id} className="self-end bg-zinc-900 px-4 py-2 rounded-3xl max-w-4/5 text-zinc-200">{message.content}</p>
                        )
                    case "assistant":
                        return (
                            <div key={message.id} className="self-start prose-invert w-4/5 prose prose-zinc">
                                {message.parts.map((part, index) => (
                                    part.type === "text" && <Markdown remarkPlugins={[remarkGfm]} key={index}>{part.text}</Markdown>
                                ))}
                            </div>
                        )
                }
            })}
        </div>
    )
}