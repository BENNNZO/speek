"use client"

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UIMessage } from "ai"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default memo(function Message({ message, reloadFunction, editFunction }: { message: UIMessage, reloadFunction: (id: string) => void, editFunction: (id: string, content: string) => void }) {
    const [editState, setEditState] = useState(false)
    const [editContent, setEditContent] = useState(message.content)

    switch (message.role) {
        case "user":
            return (
                <div className="relative self-end max-w-4/5">
                    <motion.div
                        className="group/container"
                        layoutId={message.id}
                    >
                        <div className="flex flex-col gap-2">
                            {message?.experimental_attachments &&
                                <div className="flex gap-2">
                                    {message?.experimental_attachments
                                        ?.filter(attachment =>
                                            attachment?.contentType?.startsWith('image/'),
                                        )
                                        .map((attachment, index) => (
                                            <Image
                                                key={`${message.id}-${index}`}
                                                src={attachment.url}
                                                width={96}
                                                height={96}
                                                className="rounded-2xl size-24 object-cover"
                                                alt={attachment.name ?? `attachment-${index}`}
                                            />
                                        ))}
                                </div>
                            }
                            <p className="self-end bg-zinc-700 px-4 py-2 rounded-3xl text-zinc-200">{message.content}</p>
                        </div>
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
                                initial={{ backdropFilter: "blur(0px)", background: "rgba(0, 0, 0, 0)" }}
                                animate={{ backdropFilter: "blur(20px)", background: "rgba(0, 0, 0, 0.5)" }}
                                exit={{ backdropFilter: "blur(0px)", background: "rgba(0, 0, 0, 0)" }}
                                className="z-10 fixed inset-0 place-items-center grid"
                                onClick={() => setEditState(false)}
                            >
                                <motion.div
                                    className="flex flex-col p-4"
                                    onClick={(e) => e.stopPropagation()}
                                    layoutId={message.id}
                                >
                                    <div className="flex flex-col bg-zinc-800 rounded-3xl w-xl h-74">
                                        <textarea autoFocus placeholder="editing..." className="mx-5 mt-4 mb-2 focus:outline-none h-full resize-none edit-scrollbar" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                                        <div className="flex justify-end gap-2 p-3">
                                            <button
                                                className="bg-zinc-900 hover:bg-zinc-950 px-3 py-1 rounded-full duration-150 cursor-pointer"
                                                onClick={() => setEditState(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-zinc-200 hover:bg-white px-3 py-1 rounded-full text-zinc-950 duration-150 cursor-pointer"
                                                onClick={() => editFunction(message.id, editContent)}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            )
        case "assistant":
            return (
                <div className="relative self-start w-4/5">
                    <div className="prose-invert prose prose-zinc">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                pre(props) {
                                    return (
                                        <pre className="p-0">
                                            {props.children}
                                        </pre>
                                    )
                                },
                                code(props) {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { children, className, node, ref, ...rest } = props
                                    const match = /language-(\w+)/.exec(className || "")

                                    return match ? (
                                        <div className="bg-zinc-700 border-2 border-zinc-700 rounded-xl overflow-hidden">
                                            <div className="flex justify-between px-3 py-2 h-10 not-prose">
                                                <p className="text-base not-prose">{match[1]}</p>
                                                <CopyButton content={String(children)} />
                                            </div>
                                            <SyntaxHighlighter
                                                {...rest}
                                                language={match[1]}
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    margin: 0,
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                {String(children)}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code {...rest} className="bg-zinc-700 px-1.5 py-0.5 rounded-md text-white not-prose">
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {message.content}
                        </Markdown>
                    </div>
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
                                onClick={() => {
                                    reloadFunction(message.id)
                                }}
                            />
                        </Button>
                    </div>
                </div>
            )
    }
})

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