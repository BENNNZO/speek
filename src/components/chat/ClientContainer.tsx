"use client"

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";

import SideBar from "@/components/chat/SideBar";
import Messages from "@/components/chat/Messages";
import Gradients from "@/components/chat/Gradients";
import InputArea from "@/components/chat/InputArea";

export default function ClientContainer() {
    const searchParams = useSearchParams()

    const [thinking, setThinking] = useState<boolean>(false)
    const [sidebar, setSidebar] = useState<boolean>(true)
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false)
    const [noMessages, setNoMessages] = useState(true)

    // update chatlog when the id in the url changes
    useEffect(() => {
        if (searchParams.get("id")) {
            setMessages([])
            setLoadingMessages(true)

            axios.get(`/api/user/chat/messages/${searchParams.get("id")}`)
                .then(res => {
                    setMessages(res.data)
                    setLoadingMessages(false)
                })
                .catch(err => console.log(err))
        }
    }, [searchParams])

    const { messages, status, reload, stop, setMessages, append, id } = useChat({ api: "api/openai" })

    // setup message ref for callback functions
    const messagesRef = useRef(messages)
    useEffect(() => {
        messagesRef.current = messages

        if (messages.length === 0) {
            setNoMessages(true)
        } else {
            setNoMessages(false)
        }
    }, [messages])

    // callback function for quickly retrying the last message in the chat
    const errorReloadCallback = useCallback(() => {
        reload({ body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
    }, [reload, thinking])

    // callback function for reload button on each assistant message
    const reloadIdCallback = useCallback((id: string) => {
        const messagesCallback = messagesRef.current

        messagesCallback.forEach((message, index) => {
            if (message.id === id) {
                const userMessage = messagesCallback[index - 1]

                setMessages(messagesCallback.slice(0, index - 1))
                append(userMessage, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        })
    }, [append, setMessages, thinking])

    // callback function for edit button on each user message
    const editIdCallback = useCallback((id: string, content: string) => {
        const messagesCallback = messagesRef.current

        messagesCallback.forEach((message, index) => {
            if (message.id === id) {
                setMessages(messagesCallback.slice(0, index))
                append({ role: "user", content }, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        })
    }, [append, setMessages, thinking])

    return (
        <motion.div
            initial={{ gridTemplateColumns: "18rem 1fr" }}
            animate={{ gridTemplateColumns: sidebar ? "18rem 1fr" : "0rem 1fr" }}
            className="grid h-screen"
        >
            <SideBar state={sidebar} setLoading={setLoadingMessages} />
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
                    errorReload={errorReloadCallback}
                    reloadFunction={reloadIdCallback}
                    editFunction={editIdCallback}
                    loading={loadingMessages}
                />
                <Gradients color="black" />
                <InputArea
                    noMessages={noMessages}
                    status={status}
                    thinking={thinking}
                    setThinking={setThinking}
                    reload={errorReloadCallback}
                    append={append}
                    stop={stop}
                    id={searchParams.get("id") || id}
                />
            </div>
        </motion.div>
    )
}

// [ x ] add retry button on all messages
// [ x ] add a edit button to user messages
// [ x ] error handling
// [ x ] make the input box get taller as more content is added
// [ x ] add support for images
// [ x ] add support for multiple chats
// [ x ] add new chat button
// [  ] add auto scrolling as the chat gets longer



// 90% of what openAI offers at 10% of the price