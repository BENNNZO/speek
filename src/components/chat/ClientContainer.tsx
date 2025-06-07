"use client"

import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import SideBar from "@/components/chat/SideBar";
import Messages from "@/components/chat/Messages";
import Gradients from "@/components/chat/Gradients";
import InputArea from "@/components/chat/InputArea";
import axios from "axios";

export default function ClientContainer() {
    const searchParams = useSearchParams()

    const [thinking, setThinking] = useState<boolean>(false)
    const [totalTokens, setTotalTokens] = useState<number>(0)
    const [sidebar, setSidebar] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`/api/user/chat/messages/${searchParams.get("id")}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [])

    const { messages, input, setInput, status, reload, stop, setMessages, append, id } = useChat({
        api: "api/openai",
        onFinish: (message, { usage }) => {
            setTotalTokens(prev => prev + usage.totalTokens)
        }
    })

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
        <motion.div
            initial={{ gridTemplateColumns: "18rem 1fr" }}
            animate={{ gridTemplateColumns: sidebar ? "18rem 1fr" : "0rem 1fr" }}
            className="grid h-screen"
        >
            <SideBar state={sidebar} />
            <div className="relative w-full">
                <button
                    className="top-4 left-4 z-50 absolute bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full duration-150 cursor-pointer"
                    onClick={() => setSidebar(prev => !prev)}
                >
                    <Image
                        src="/arrow-forward.svg"
                        width={24}
                        height={24}
                        alt="open / close sidebar"
                        className={`invert duration-400 delay-150 opacity-75 ${sidebar ? "rotate-180" : "rotate-0"}`}
                    />
                </button>
                <Messages
                    messages={messages}
                    status={status}
                    reload={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}
                    reloadFunction={reloadId}
                    editFunction={editId}
                />
                <Gradients color="black" />
                <InputArea
                    input={input}
                    status={status}
                    thinking={thinking}
                    setThinking={setThinking}
                    setInput={setInput}
                    append={append}
                    reload={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })}
                    stop={stop}
                    id={id}
                />
            </div>
            <DebugInfo />
        </motion.div>
    );

















    function DebugInfo() {
        return (
            <div className="right-4 bottom-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border-white/15 border-t rounded-2xl">
                <Link href="/" className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer">Home</Link>
                <div className="bg-white/15 mx-2 h-px"></div>
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