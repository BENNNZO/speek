"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UIMessage } from "ai"
import { useChat } from "@ai-sdk/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function Message({ message }: { message: UIMessage }) {
    const [copied, setCopied] = useState(false)

    const { reload } = useChat()

    useEffect(() => {
        const copiedTimeout = setTimeout(() => {
            setCopied(false)
        }, 1500)

        return () => clearTimeout(copiedTimeout)
    }, [copied])

    switch (message.role) {
        case "user":
            return (
                <p key={message.id} className="self-end bg-zinc-900 px-4 py-2 rounded-3xl max-w-4/5 text-zinc-200">{message.content}</p>
            )
        case "assistant":
            return (
                <div key={message.id} className="relative self-start w-4/5">
                    {message.parts.map((part, index) => (
                        part.type === "text" && (
                            <div className="prose-invert prose prose-zinc">
                                <Markdown remarkPlugins={[remarkGfm]} key={index}>{part.text}</Markdown>
                            </div>
                        )
                    ))}
                    <div className="top-full left-0 absolute flex justify-center items-center gap-3 pt-2 not-prose">
                        <CopyButton copied={copied} content={message.content} setCopied={setCopied} />
                        {/* <Image
                            src="/refresh.svg"
                            width={25}
                            height={25}
                            alt="stop"
                            className="opacity-50 hover:opacity-100 invert pb-0.5 duration-150 cursor-pointer"
                            onClick={() => reload()}
                        /> */}
                    </div>
                </div>
            )
    }
}

function CopyButton({ copied, content, setCopied }: { copied: boolean, content: string, setCopied: Function }) {
    return (
        <AnimatePresence
            mode="wait"
        >
            {!copied ? (
                <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.75, rotate: -50 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: 25 }}
                >
                    <Image
                        src="/copy.svg"
                        width={25}
                        height={25}
                        alt="copy text"
                        className="opacity-50 hover:opacity-100 invert duration-150 cursor-pointer"
                        onClick={() => {
                            window.navigator.clipboard.writeText(content)
                            setCopied(true)
                        }}
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.75, rotate: -50 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: 25 }}
                >
                    <Image
                        src="/checkmark.svg"
                        width={25}
                        height={25}
                        alt="copy text"
                        className="opacity-50 hover:opacity-100 invert duration-150 cursor-pointer"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}