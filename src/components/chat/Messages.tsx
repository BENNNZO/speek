import { UIMessage } from "ai"
import Image from "next/image";
import Message from "./Message";

interface Props {
    messages: UIMessage[],
    status: string,
    reload: () => void,
    reloadFunction: (id: string) => void,
    editFunction: (id: string, content: string) => void
}

export default function Messages({ messages, status, reload, reloadFunction, editFunction }: Props) {

    return (
        <div className="flex flex-col gap-8 mx-auto pb-32 max-w-4xl">
            {/* MESSAGES */}
            {messages.map((message) => (
                <Message key={message.id} message={message} reloadFunction={reloadFunction} editFunction={editFunction} />
            ))}

            {/* LOADER */}
            {status === "submitted" && <Image src="/loader.svg" width={35} height={35} alt="loader" />}

            {/* ERROR MESSAGE */}
            {status === "error" &&
                <div className="flex justify-between items-center bg-red-900/25 py-2 pr-2 pl-5 border border-red-900/50 rounded-full w-full">
                    <p>An unexpected error has occured!</p>
                    <button onClick={() => reload()} className="flex gap-2 bg-red-950 px-4 py-1 border-t border-t-white/15 rounded-full cursor-pointer">
                        <p>Retry</p>
                        <Image src="/refresh.svg" width={20} height={20} alt="refresh icon" className="invert" />
                    </button>
                </div>
            }
        </div>
    )
}