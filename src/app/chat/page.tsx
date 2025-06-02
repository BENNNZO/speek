"use client"

import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { useState } from "react";

import Messages from "@/components/chat/Messages";

export default function Home() {
    const [totalTokens, setTotalTokens] = useState(0)
    const [thinking, setThinking] = useState(false)

    function finishCallback(usage: number) {
        setTotalTokens(prev => prev + usage)
    }

    const { messages, input, handleInputChange, handleSubmit, status, reload, stop, setMessages } = useChat({
        api: "api/openai",
        onFinish: (message, { usage }) => { finishCallback(usage.totalTokens) }
    })

    return (
        <div className="p-12">
            {/* AI CHAT MESSAGES */}
            <Messages messages={messages} status={status} reloadFunction={() => reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })} />

            {/* BOTTOM GRADIENT */}
            <div className="bottom-4 left-0 fixed bg-gradient-to-t from-zinc-900 to-transparent w-full h-32"></div>
            <div className="bottom-0 left-0 fixed bg-zinc-900 w-full h-4"></div>

            {/* INPUT AREA */}
            <div className="bottom-8 left-1/2 fixed flex gap-2 -translate-x-1/2">
                <motion.button
                    onClick={() => setThinking(prev => !prev)}
                    className={`self-end ${thinking ? "bg-blue-950 border-blue-500 hover:border-blue-400 text-white" : "bg-zinc-900 border-white/15 hover:border-white/25 text-zinc-400"} px-4 py-2 border-2 rounded-full duration-150 cursor-pointer active:scale-95`}
                >
                    Reasoning
                </motion.button>

                <form
                    onSubmit={(event) => {
                        handleSubmit(event, {
                            body: {
                                model: thinking ? "o4-mini" : "gpt-4.1-nano"
                            }
                        })
                    }}
                    className="flex gap-2 bg-zinc-800 py-1.5 pr-1.5 pl-4 border-2 border-white/15 rounded-full"
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
            <div className="top-4 left-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border border-white/15 rounded-2xl">
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

// change model dropdown | or maybe just add a thinking button
// add retry button on all messages
// add a edit button to user messages
// error handling
// make the input box get taller as more content is added
// add support for images
// add support for multiple chats
// add new chat button
// add auto scrolling as the chat gets longer



// 90% of what openAI offers at 10% of the price