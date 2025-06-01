"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UIMessage } from "ai"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function Message({ message, reloadFunction }: { message: UIMessage, reloadFunction: () => void }) {
    const [editState, setEditState] = useState(false)

    switch (message.role) {
        case "user":
            return (
                <>
                    <motion.div
                        className="group/container relative self-end max-w-4/5"
                        initial={{ opacity: 0.75, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        layoutId={message.id}
                    >
                        <p className="bg-zinc-800 px-4 py-2 rounded-3xl text-zinc-200">{message.content}</p>
                        <div className="top-full right-0 absolute flex justify-center items-center gap-2 opacity-0 group-hover/container:opacity-100 pt-2 duration-150">
                            <Button hoverText="Copy" delay={0}>
                                <CopyButton content={message.content} />
                            </Button>
                            <Button hoverText="Edit" delay={0.1}>
                                <Image
                                    src="/pencil.svg"
                                    width={22}
                                    height={22}
                                    alt="stop"
                                    className="opacity-50 hover:opacity-100 invert ml-1 duration-150 cursor-pointer"
                                    onClick={() => setEditState(true)}
                                />
                            </Button>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {editState &&
                            <motion.div
                                initial={{ backdropFilter: "blur(0px)" }}
                                animate={{ backdropFilter: "blur(20px)" }}
                                exit={{ backdropFilter: "blur(0px)" }}
                                className="z-10 fixed inset-0 place-items-center grid backdrop-blur-md"
                                onClick={() => setEditState(false)}
                            >
                                <motion.div
                                    className="bg-zinc-800 px-4 py-2 border border-white/15 rounded-3xl"
                                    onClick={(e) => e.stopPropagation()}
                                    layoutId={message.id}
                                >
                                    <input autoFocus type="text" placeholder="editing..." className="focus:outline-none" value={message.content} />
                                    <button onClick={() => setEditState(false)}>CLOSE</button>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </>
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
                    <div className="top-full left-0 absolute flex justify-center items-center gap-2 pt-2">
                        <Button hoverText="Copy" delay={0}>
                            <CopyButton content={message.content} />
                        </Button>
                        <Button hoverText="Reason" delay={0.1}>
                            <Image
                                src="/bulb.svg"
                                width={22}
                                height={22}
                                alt="stop"
                                className="opacity-50 hover:opacity-100 invert ml-1 duration-150 cursor-pointer"
                            />
                        </Button>
                        <Button hoverText="Retry" delay={0.2}>
                            <Image
                                src="/refresh.svg"
                                width={22}
                                height={22}
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
            className="group/button relative"
        >
            <motion.div
                whileHover={{ rotate: 15 }}
            >
                {children}
            </motion.div>
            <div className="top-[calc(100%+8px)] left-1/2 absolute opacity-0 group-hover/button:opacity-100 -translate-x-1/2 duration-150 pointer-events-none">
                <p className="bg-zinc-900 px-2 py-0.5 rounded-lg text-zinc-400 text-sm">{hoverText}</p>
            </div>
        </motion.button>
    )
}

function CopyButton({ content }: { content: string }) {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const copiedTimeout = setTimeout(() => {
            setCopied(false)
        }, 1500)

        return () => clearTimeout(copiedTimeout)
    }, [copied])

    return (
        <AnimatePresence
            mode="wait"
        >
            {!copied ? (
                <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.75, rotate: 40 }}
                    animate={{ opacity: 1, scale: 1, rotate: 90 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: 140 }}
                >
                    <Image
                        src="/copy.svg"
                        width={22}
                        height={22}
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
                        width={22}
                        height={22}
                        alt="copy text"
                        className="opacity-50 hover:opacity-100 invert duration-150 cursor-pointer"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}