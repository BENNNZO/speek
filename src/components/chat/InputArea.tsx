"use client"

import { useEffect, useRef, useState } from "react"
import { Message, CreateMessage, ChatRequestOptions } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Props {
    status: "submitted" | "streaming" | "ready" | "error",
    thinking: boolean,
    noMessages: boolean,
    setThinking: React.Dispatch<React.SetStateAction<boolean>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    reload: () => void
    stop: () => void
    id: string
}

// Animation settings for framer-motion on dynamic action button
const animationProps = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, scale: 0.75, transition: { duration: 0.1 } }
}

export default function InputArea({ thinking, setThinking, append, status, stop, reload, id, noMessages }: Props) {
    // Refs for textarea and file input
    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [newChatUUID, setNewChatUUID] = useState("")
    const [input, setInput] = useState("")

    // State for attached files
    const [files, setFiles] = useState<{ id: string, file: File }[]>([])

    useEffect(() => {
        setNewChatUUID(crypto.randomUUID())
    }, [])

    // Auto-resize textarea based on input
    useEffect(() => {
        const inputElement = inputRef.current
        if (inputElement) {
            inputElement.style.height = "auto"
            inputElement.style.height = inputElement.scrollHeight + "px"
        }
    }, [input])

    // Handle image paste from clipboard
    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const clipboardItems = event.clipboardData?.items;
            if (!clipboardItems) return;

            const newFiles = [...files ?? []];

            for (const item of clipboardItems) {
                if (item.type.startsWith("image/")) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const file = new File([blob], "pasted-image", { type: blob.type });
                        newFiles.push({ id: crypto.randomUUID(), file });
                    }
                }
            }

            // Only allow up to 5 files
            if (newFiles.length > (files?.length || 0) && newFiles.length <= 5) {
                setFiles(newFiles);
            }
        }

        window.addEventListener("paste", handlePaste)

        return () => window.removeEventListener("paste", handlePaste)
    }, [files]);

    // Remove file at given index
    function handleAttachmentDelete(index: number) {
        if (!files) return

        setFiles(prev => prev.filter((_, fileIndex) => index !== fileIndex))
    }

    // // Prepare files for submission as FileList
    function getFileListForSubmit() {
        const dt = new DataTransfer()

        files?.forEach(({ file }) => {
            dt.items.add(file)
        })

        return dt.files
    }

    // Handle message submit
    function handleSubmit() {
        if (input.trim()) {
            setInput("")
            append(
                {
                    role: "user",
                    content: input
                },
                {
                    body: {
                        model: thinking ? "o4-mini" : "gpt-4.1-nano",
                        prompt: input,
                        id
                    },
                    experimental_attachments: getFileListForSubmit()
                }
            )

            setFiles([]);

            // Reset file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    // Submit on Enter (without Shift)
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                top: noMessages ? "50%" : "calc(100% - 7.5rem)",
                translateY: noMessages ? "-50%" : "0%"
            }}
            className="left-1/2 absolute flex flex-col gap-2 bg-zinc-800 p-2 rounded-3xl -translate-x-1/2 pointer-events-auto"
        >
            {/* Textarea for user input */}
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
            {/* Hidden file input for attachments */}
            <input
                ref={fileInputRef}
                multiple
                type="file"
                className="hidden"
                data-cnp-create-listener="true"
                onChange={event => {
                    if (event.target.files) {
                        // Only allow up to 5 files in total
                        if (event.target.files.length <= 5 - (files?.length ?? 5)) {
                            setFiles(prev => [
                                ...prev,
                                ...Array.from(event.target.files as FileList).map(file => ({ id: crypto.randomUUID(), file }))
                            ]);
                        }
                    }
                }}
                accept="image/jpeg,.jpeg,.jpg,image/png,.png,image/webp,.webp,text/plain,.txt,.eml,.xml,text/html,.html,text/markdown,.md,text/csv,.csv,text/tab-separated-values,.tsv,application/rtf,.rtf,application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,application/vnd.oasis.opendocument.text,.odt,application/epub+zip,.epub,application/vnd.ms-excel,.xlsx,application/vnd.ms-outlook,.msg,text/x-rst,.rst"
            />
            {/* Preview of attached files */}
            <div className="bottom-[calc(100%+1rem)] left-0 absolute flex gap-2 h-24">
                {files && (files.length > 0) && <p className="bottom-[calc(100%+0.5rem)] left-0 absolute font-semibold text-zinc-600 whitespace-nowrap">{files.length} / 5</p>}
                <AnimatePresence mode="popLayout">
                    {files && files.map((fileObject, index) =>
                        fileObject.file.type.startsWith("image/") ? (
                            <motion.div
                                layout
                                key={fileObject.id}
                                initial={{ scale: 0.9, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="group relative"
                            >
                                {/* Delete button for image */}
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
                                {/* Image preview */}
                                <Image
                                    src={URL.createObjectURL(fileObject.file)}
                                    alt={fileObject.file.name}
                                    width={96}
                                    height={96}
                                    className="rounded-2xl size-24 object-cover"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                key={fileObject.id}
                                initial={{ scale: 0.9, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="group relative flex flex-col justify-between p-1 border-2 border-white/15 rounded-2xl w-32 h-24 overflow-hidden text-sm"
                            >
                                {/* Delete button for image */}
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
                                <p className="px-2 py-1 rounded-xl truncate">{fileObject.file.name}</p>
                                <div className="flex items-center gap-2 p-1 rounded-xl">
                                    <Image
                                        src="/document.svg"
                                        width={24}
                                        height={24}
                                        alt="delete image"
                                        className="invert"
                                    />
                                    <p>{fileObject.file.name.substring(fileObject.file.name.lastIndexOf('.') + 1).toUpperCase()}</p>
                                </div>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </div>
            {/* Action buttons row */}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {/* New chat button (no handler) */}
                    <Link
                        href={`/chat?id=${newChatUUID}`}
                        className="place-items-center grid bg-zinc-600 hover:bg-zinc-500 rounded-full size-[40px] duration-150 cursor-pointer"
                        onClick={() => setNewChatUUID(crypto.randomUUID())}
                    >
                        <Image
                            src="/add.svg"
                            width={28}
                            height={28}
                            alt="new chat"
                            className="invert m-auto"
                        />
                    </Link>
                    {/* Attach file button */}
                    <button
                        className="bg-zinc-600 hover:bg-zinc-500 rounded-full size-[40px] duration-150 cursor-pointer"
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
                    {/* Toggle "thinking" mode */}
                    <button
                        onClick={() => setThinking(prev => !prev)}
                        className={`flex items-center gap-1 pr-4 pl-1 rounded-full cursor-pointer ${thinking ? "bg-blue-600 hover:bg-blue-500" : "bg-zinc-600 hover:bg-zinc-500"} duration-150`}
                    >
                        <AnimatePresence mode="popLayout">
                            {thinking ? (
                                <motion.div
                                    key="thinking-on"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Image
                                        src="/bulb-on.svg"
                                        width={32}
                                        height={32}
                                        alt="thinking icons"
                                        className="invert m-auto p-1 duration-300"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="thinking-off"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Image
                                        src="/bulb-off.svg"
                                        width={32}
                                        height={32}
                                        alt="thinking icons"
                                        className="bottom-0.5 relative invert m-auto p-1 duration-300"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <p>Reason</p>
                    </button>
                </div>
                {/* Submit/Stop/Reload button */}
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
                        {/* Show different icon based on status */}
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
        </motion.div >
    )
}