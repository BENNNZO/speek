"use client"

import { useRef, useEffect, memo } from "react";
import { UIMessage } from "ai"
import Image from "next/image";
import Message from "./Message";

interface Props {
    messages: UIMessage[],
    status: string,
    errorReload: () => void,
    reloadFunction: (id: string) => void,
    editFunction: (id: string, content: string) => void,
    loading: boolean
}

export default memo(function Messages({ messages, status, errorReload, reloadFunction, editFunction, loading }: Props) {
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (messagesContainerRef?.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }, [loading])

    return (
        <div ref={messagesContainerRef} className="w-full max-h-screen overflow-x-hidden overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-8 mx-auto pt-12 pb-44 max-w-4xl">
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
                        <button onClick={() => errorReload()} className="flex gap-2 bg-red-950 px-4 py-1 border-t border-t-white/15 rounded-full cursor-pointer">
                            <p>Retry</p>
                            <Image src="/refresh.svg" width={20} height={20} alt="refresh icon" className="invert" />
                        </button>
                    </div>
                }

                {/* LOADING MESSAGES */}
                {loading &&
                    <div className="top-0 left-0 absolute place-items-center grid bg-zinc-950 w-full h-screen">
                        <Image src="/loader.svg" width={35} height={35} alt="loader" />
                    </div>
                }
            </div>
        </div>
    )
})