"use client"

import { useEffect, useRef, useState } from "react"
import { Message, CreateMessage, ChatRequestOptions } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Props {
    input: string,
    status: "submitted" | "streaming" | "ready" | "error",
    thinking: boolean,
    setThinking: React.Dispatch<React.SetStateAction<boolean>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    reload: () => void
    stop: () => void
}

const animationProps = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, scale: 0.75, transition: { duration: 0.1 } }
}

export default function InputArea({ thinking, setThinking, input, setInput, append, status, stop, reload }: Props) {
    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [files, setFiles] = useState<FileList | undefined>(undefined)

    useEffect(() => {
        const inputElement = inputRef.current
        if (inputElement) {
            inputElement.style.height = "auto"
            inputElement.style.height = inputElement.scrollHeight + "px"
        }
    }, [input])

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const clipboardItems = event.clipboardData?.items;
            if (!clipboardItems) return;

            const dt = new DataTransfer();
            if (files) {
                for (let i = 0; i < files.length; i++) dt.items.add(files[i])
            }

            for (const item of clipboardItems) {
                if (item.type.startsWith("image/")) {
                    const blob = item.getAsFile()
                    if (blob) {
                        const file = new File([blob], "pasted-image", { type: blob.type })
                        dt.items.add(file)
                    }
                }
            }

            if (dt.files.length > (files?.length || 0)) {
                setFiles(dt.files)
            }
        }

        window.addEventListener("paste", handlePaste)

        return () => window.removeEventListener("paste", handlePaste)
    }, [files]);

    function handleAttachmentDelete(index: number) {
        if (!files) return

        const dt = new DataTransfer()
        Array.from(files).forEach((file, fileIndex) => {
            if (index !== fileIndex) dt.items.add(file)
        })

        setFiles(dt.files)
    }

    function handleSubmit() {
        if (input.trim()) {
            setInput("")
            append({ role: "user", content: input }, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" }, experimental_attachments: files })

            setFiles(undefined);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="bottom-4 left-1/2 absolute flex flex-col gap-2 bg-zinc-800 p-2 rounded-3xl -translate-x-1/2 pointer-events-auto bo/20">
            <textarea
                ref={inputRef}
                value={input}
                rows={1}
                autoFocus
                className="hover:bg-zinc-700 focus:bg-zinc-600 px-1.5 hover:px-3 focus:px-3 py-2 rounded-3xl outline-none w-2xl duration-150 resize-none"
                placeholder="Ask Anything..."
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
            <input
                ref={fileInputRef}
                multiple
                type="file"
                className="hidden"
                data-cnp-create-listener="true"
                onChange={event => {
                    if (event.target.files) {
                        setFiles(event.target.files);
                    }
                }}
                accept="image/jpeg,.jpeg,.jpg,image/png,.png,image/webp,.webp,text/plain,.txt,.eml,.xml,text/html,.html,text/markdown,.md,text/csv,.csv,text/tab-separated-values,.tsv,application/rtf,.rtf,application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,application/vnd.oasis.opendocument.text,.odt,application/epub+zip,.epub,application/vnd.ms-excel,.xlsx,application/vnd.ms-outlook,.msg,text/x-rst,.rst"
            />
            <div className="bottom-[calc(100%+1rem)] left-0 absolute flex gap-2">
                {files && Array.from(files).map((file, index) =>
                    file.type.startsWith("image/") ? (
                        <motion.div
                            key={index}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0.5 }}
                            className="group relative"
                        >
                            <button
                                className="top-2 right-2 absolute bg-zinc-600 opacity-0 group-hover:opacity-100 rounded-full duration-150 cursor-pointer"
                                onClick={() => handleAttachmentDelete(index)}
                            >
                                <Image
                                    src="/close.svg"
                                    width={24}
                                    height={24}
                                    alt="delete image"
                                    className="invert"
                                />
                            </button>
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={96}
                                height={96}
                                className="rounded-2xl size-24 object-cover"
                            />
                        </motion.div>
                    ) : null
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <button className="bg-zinc-600 rounded-full size-[40px]">
                        <Image
                            src="/add.svg"
                            width={28}
                            height={28}
                            alt="new chat"
                            className="invert m-auto"
                        />
                    </button>
                    <button
                        className="bg-zinc-600 rounded-full size-[40px]"
                        onClick={() => {
                            fileInputRef.current?.click()
                        }}
                    >
                        <Image
                            src="/attach.svg"
                            width={28}
                            height={28}
                            alt="attach"
                            className="invert m-auto rotate-45"
                        />
                    </button>
                    <button
                        onClick={() => setThinking(prev => !prev)}
                        className={`flex items-center gap-1 pr-4 pl-2 rounded-full cursor-pointer ${thinking ? "bg-blue-600" : "bg-zinc-600 text-zinc-400"} duration-150`}
                    >
                        <Image
                            src="/bulb.svg"
                            width={28}
                            height={28}
                            alt="submit"
                            className={`invert m-auto p-1 ${thinking ? "opacity-100" : "opacity-50"} duration-300`}
                        />
                        <p>Reason</p>
                    </button>
                </div>
                <motion.button
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: status !== "submitted" && (input.trim() || status === "streaming") ? 1 : 0.5,
                        scale: status !== "submitted" && (input.trim() || status === "streaming") ? 1 : 0.9,
                        cursor: status !== "submitted" && (input.trim() || status === "streaming") ? "pointer" : "not-allowed"
                    }}
                    className="bg-zinc-200 rounded-full size-[40px] cursor-pointer"
                    onClick={() => {
                        if (status === "ready") handleSubmit()
                        if (status === "streaming") stop()
                        if (status === "error") reload()
                    }}
                >
                    <AnimatePresence mode="wait">
                        {status === "ready" ? (
                            <motion.div
                                key="ready"
                                {...animationProps}
                            >
                                <Image
                                    src="/arrow-up.svg"
                                    width={32}
                                    height={32}
                                    alt="submit"
                                    className="m-auto p-1"
                                />
                            </motion.div>
                        ) : status === "error" ? (
                            <motion.div
                                key="reload"
                                {...animationProps}
                            >
                                <Image
                                    src="/refresh.svg"
                                    width={32}
                                    height={32}
                                    alt="submit"
                                    className="m-auto p-1"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="stop"
                                {...animationProps}
                            >
                                <Image
                                    src="/stop.svg"
                                    width={32}
                                    height={32}
                                    alt="submit"
                                    className="m-auto p-2"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    )
}