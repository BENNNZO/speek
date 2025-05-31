"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence, hover } from "framer-motion";
import { UIMessage } from "ai"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function Message({ message, reloadFunction }: { message: UIMessage, reloadFunction: () => void }) {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const copiedTimeout = setTimeout(() => {
            setCopied(false)
        }, 1500)

        return () => clearTimeout(copiedTimeout)
    }, [copied])

    switch (message.role) {
        case "user":
            return (
                <motion.div
                    className="relative self-end max-w-4/5"
                    initial={{ opacity: 0.75, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <p className="bg-zinc-900 px-4 py-2 rounded-3xl text-zinc-200">{message.content}</p>
                </motion.div>
            )
        case "assistant":
            return (
                <div className="relative self-start w-4/5">
                    {message.parts.map((part, index) => (
                        part.type === "text" && (
                            <div key={index} className="prose-invert prose prose-zinc">
                                <Markdown remarkPlugins={[remarkGfm]}>{part.text}</Markdown>
                            </div>
                        )
                    ))}
                    <div className="top-full left-0 absolute flex justify-center items-center gap-2 pt-2 not-prose">
                        <Button hoverText="Copy" delay={0}>
                            <CopyButton copied={copied} content={message.content} setCopied={setCopied} />
                        </Button>
                        <Button hoverText="Reason" delay={0.1}>
                            <Image
                                src="/bulb.svg"
                                width={25}
                                height={25}
                                alt="stop"
                                className="opacity-50 hover:opacity-100 invert ml-1 duration-150 cursor-pointer"
                            />
                        </Button>
                        <Button hoverText="Retry" delay={0.2}>
                            <Image
                                src="/refresh.svg"
                                width={25}
                                height={25}
                                alt="stop"
                                className="opacity-50 hover:opacity-100 invert duration-150 cursor-pointer"
                                onClick={() => reloadFunction()}
                            />
                        </Button>
                    </div>
                </div>
            )
    }
}

function Button({ hoverText, delay, children }: { hoverText: string, delay: number, children: React.ReactNode }) {
    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay } }}
            className="group relative"
        >
            <motion.div
                whileHover={{ rotate: 15 }}
            >
                {children}
            </motion.div>
            <div className="top-[calc(100%+8px)] left-1/2 absolute opacity-0 group-hover:opacity-100 -translate-x-1/2 duration-150 pointer-events-none">
                <p className="bg-zinc-900 px-2 py-0.5 rounded-lg text-zinc-400">{hoverText}</p>
            </div>
        </motion.button>
    )
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
                    exit={{ opacity: 0, scale: 0.75, rotate: 50 }}
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