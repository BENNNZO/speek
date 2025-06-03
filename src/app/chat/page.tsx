"use client"

import { useChat } from "@ai-sdk/react";
import { generateId, appendClientMessage } from "ai";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { basic } from "@/testChats";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import Messages from "@/components/chat/Messages";
import Link from "next/link";

export default function Home() {
    const searchParams = useSearchParams()

    const [totalTokens, setTotalTokens] = useState(0)
    const [thinking, setThinking] = useState(false)

    function finishCallback(usage: number) {
        setTotalTokens(prev => prev + usage)
    }

    const { messages, input, handleInputChange, handleSubmit, status, reload, stop, setMessages, append } = useChat({
        api: "api/openai",
        onFinish: (message, { usage }) => { finishCallback(usage.totalTokens) }
    })

    useEffect(() => {
        setMessages(basic)
        console.log(basic)
        console.log(searchParams.get("id"))
    }, [])

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
                reloadFunction={(id: string) => reloadId(id)}
                editFunction={(id: string, content: string) => editId(id, content)}
            // reloadFunction={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}
            />

            {/* BOTTOM / TOP GRADIENT */}
            <div className="top-0 left-0 fixed bg-gradient-to-b from-black to-transparent w-full h-12"></div>
            <div className="bottom-4 left-0 fixed bg-gradient-to-t from-black to-transparent w-full h-32"></div>
            <div className="bottom-0 left-0 fixed bg-black w-full h-4"></div>

            {/* INPUT AREA */}
            <div className="bottom-8 left-1/2 fixed flex gap-2 -translate-x-1/2">
                <motion.button
                    onClick={() => setThinking(prev => !prev)}
                    className={`self-end ${thinking ? "bg-blue-950 hover:bg-blue-900 border-blue-500 hover:border-blue-400 text-white" : "bg-zinc-900 hover:bg-zinc-800 border-white/15 hover:border-white/25 text-zinc-400"} p-1.5 aspect-square border-t rounded-full duration-150 cursor-pointer active:scale-95`}
                >
                    <Image src="/add.svg" width={28} height={28} alt="reasoning" className="invert" style={{ opacity: thinking ? 1 : 0.5 }} />
                </motion.button>

                <motion.button
                    onClick={() => setThinking(prev => !prev)}
                    className={`self-end ${thinking ? "bg-blue-950 hover:bg-blue-900 border-blue-500 hover:border-blue-400 text-white" : "bg-zinc-900 hover:bg-zinc-800 border-white/15 hover:border-white/25 text-zinc-400"} p-2 aspect-square border-t rounded-full duration-150 cursor-pointer active:scale-95`}
                >
                    <Image src="/bulb.svg" width={24} height={24} alt="reasoning" className="invert" style={{ opacity: thinking ? 1 : 0.5 }} />
                </motion.button>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event, {
                            body: {
                                model: thinking ? "o4-mini" : "gpt-4.1-nano"
                            }
                        })
                    }}
                    className="flex gap-2 bg-zinc-800 py-1.5 pr-1.5 pl-4 border-white/15 border-t rounded-full"
                >
                    <input
                        required
                        autoFocus
                        type="text"
                        placeholder="Ask Anything..."
                        value={input}
                        onChange={handleInputChange}
                        className="focus:outline-none w-96"
                    />
                </form>
            </div>

            {/* DEBUG INFO */}
            <div className="top-4 left-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border-white/15 border-t rounded-2xl">
                <Link href="/" className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer">Home</Link>
                <div className="bg-white/15 mx-2 h-px"></div>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">ID: {searchParams.get("id")}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">INPUT: {JSON.stringify(input)}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">TOKENS: {totalTokens}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">STATUS: {status}</p>
                <p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">THINKING: {JSON.stringify(thinking)}</p>
                <div className="bg-white/15 mx-2 h-px"></div>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}>Reload</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => stop()}>Stop</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => window.navigator.clipboard.writeText(JSON.stringify(messages))}>Copy Messages</button>
                <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={async () => {
                    const text = await window.navigator.clipboard.readText()
                    setMessages(JSON.parse(text))
                }}>Paste Messages</button>
            </div>
        </div>
    );
}

// [ x ] add retry button on all messages
// [ x ] add a edit button to user messages
// [  ] error handling
// [  ] make the input box get taller as more content is added
// [  ] add support for images
// [  ] add support for multiple chats
// [  ] add new chat button
// [  ] add auto scrolling as the chat gets longer



// 90% of what openAI offers at 10% of the price