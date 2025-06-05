"use client"

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { basic } from "@/testChats";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Messages from "@/components/chat/Messages";
import InputArea from "@/components/chat/InputArea";

export default function Home() {
    const searchParams = useSearchParams()

    const [totalTokens, setTotalTokens] = useState<number>(0)
    const [thinking, setThinking] = useState<boolean>(false)

    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    function finishCallback(usage: number) {
        setTotalTokens(prev => prev + usage)
    }

    const { messages, input, setInput, handleInputChange, handleSubmit, status, reload, stop, setMessages, append } = useChat({
        api: "api/openai",
        onFinish: (message, { usage }) => { finishCallback(usage.totalTokens) }
    })

    useEffect(() => {
        setMessages(basic)
        // console.log(basic)
        // console.log(searchParams.get("id"))
    }, [])

    useEffect(() => {
        const inputElement = inputRef.current
        if (inputElement) {
            inputElement.style.height = "auto"
            inputElement.style.height = inputElement.scrollHeight + "px"
        }
    }, [input])

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            if (input.trim()) {
                setInput("")
                append({ role: "user", content: input }, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        }
    }

    // function for reload button on each assistant message
    function reloadId(id: string) {
        messages.forEach((message, index) => {
            if (message.id === id) {
                const userMessage = messages[index - 1]

                setMessages(messages.slice(0, index - 1))
                append(userMessage, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        })
    }

    // function for edit button on each user message
    function editId(id: string, content: string) {
        messages.forEach((message, index) => {
            if (message.id === id) {
                setMessages(messages.slice(0, index))
                append({ role: "user", content }, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        })
    }

    return (
        <div className="p-12">

            {/* AI CHAT MESSAGES */}
            <Messages
                messages={messages}
                status={status}
                reload={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}
                reloadFunction={(id: string) => reloadId(id)}
                editFunction={(id: string, content: string) => editId(id, content)}
            />

            {/* BOTTOM / TOP GRADIENT */}
            <div className="top-0 left-0 fixed bg-gradient-to-b from-black to-transparent w-full h-12"></div>
            <div className="bottom-4 left-0 fixed bg-gradient-to-t from-black to-transparent w-full h-32"></div>
            <div className="bottom-0 left-0 fixed bg-black w-full h-4"></div>

            {/* INPUT AREA */}
            <div className="bottom-4 left-1/2 fixed flex flex-col gap-2 bg-zinc-900 p-2 border-t border-t-white/20 rounded-3xl -translate-x-1/2">
                <textarea
                    ref={inputRef}
                    value={input}
                    rows={1}
                    className="hover:bg-zinc-800 focus:bg-zinc-700 px-1 focus:px-3 py-1 rounded-2xl outline-none w-lg duration-150 resize-none"
                    placeholder="Ask Anything..."
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}
                />
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <button className="bg-zinc-600 border-t border-t-white/25 rounded-full size-[32px]">
                            <Image
                                src="/add.svg"
                                width={28}
                                height={28}
                                alt="new chat"
                                className="invert m-auto"
                            />
                        </button>
                        <button className="bg-zinc-600 border-t border-t-white/25 rounded-full size-[32px]">
                            <Image
                                src="/attach.svg"
                                width={28}
                                height={28}
                                alt="attach"
                                className="invert m-auto rotate-45"
                            />
                        </button>
                        <button className="bg-zinc-600 px-3 border-t border-t-white/25 rounded-full">
                            Reason
                        </button>
                    </div>
                    <button className="bg-zinc-600 border-t border-t-white/25 rounded-full size-[32px]">
                        <Image
                            src="/arrow-up.svg"
                            width={28}
                            height={28}
                            alt="submit"
                            className="invert m-auto p-1"
                        />
                    </button>
                </div>
            </div>

            {/* DEBUG INFO */}
            <DebugInfo />
        </div>
    );

    function DebugInfo() {
        return (
            <div className="top-4 left-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border-white/15 border-t rounded-2xl">
                <Link href="/" className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer">Home</Link>
                <div className="bg-white/15 mx-2 h-px"></div>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">ID: {searchParams.get("id")}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">INPUT: {JSON.stringify(input)}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">TOKENS: {totalTokens}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">STATUS: {status}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">THINKING: {JSON.stringify(thinking)}</p>
                <div className="bg-white/15 mx-2 h-px"></div>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => setMessages([])}>Clear</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}>Reload</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => stop()}>Stop</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => window.navigator.clipboard.writeText(JSON.stringify(messages))}>Copy Messages</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={async () => {
                    const text = await window.navigator.clipboard.readText()
                    setMessages(JSON.parse(text))
                }}>Paste Messages</button>
            </div>
        )
    }
}

// [ x ] add retry button on all messages
// [ x ] add a edit button to user messages
// [ x ] error handling
// [ x ] make the input box get taller as more content is added
// [  ] add support for images
// [  ] add support for multiple chats
// [  ] add new chat button
// [  ] add auto scrolling as the chat gets longer



// 90% of what openAI offers at 10% of the price