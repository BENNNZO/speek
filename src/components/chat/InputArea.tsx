"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Message, CreateMessage, ChatRequestOptions } from "ai"

interface Props {
    input: string,
    thinking: boolean,
    setThinking: React.Dispatch<React.SetStateAction<boolean>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

export default function InputArea({ thinking, setThinking, input, setInput, append }: Props) {

    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const fileUploadRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const inputElement = inputRef.current
        if (inputElement) {
            inputElement.style.height = "auto"
            inputElement.style.height = inputElement.scrollHeight + "px"
        }
    }, [input])

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            if (input.trim()) {
                setInput("")
                append({ role: "user", content: input }, { body: { model: thinking ? "o4-mini" : "gpt-4.1-nano" } })
            }
        }
    }
    return (
        <div className="bottom-4 left-1/2 fixed flex flex-col gap-2 bg-zinc-800 p-2 rounded-3xl -translate-x-1/2 bo/20">
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
                    <div className="flex">
                        <input
                            ref={fileUploadRef}
                            multiple
                            type="file"
                            className="hidden"
                            data-cnp-create-listener="true"
                            accept="image/jpeg,.jpeg,.jpg,image/png,.png,image/webp,.webp,text/plain,.txt,.eml,.xml,text/html,.html,text/markdown,.md,text/csv,.csv,text/tab-separated-values,.tsv,application/rtf,.rtf,application/pdf,.pdf,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,application/vnd.oasis.opendocument.text,.odt,application/epub+zip,.epub,application/vnd.ms-excel,.xlsx,application/vnd.ms-outlook,.msg,text/x-rst,.rst"
                        />
                        <button
                            className="bg-zinc-600 rounded-full size-[40px]"
                            onClick={() => {
                                fileUploadRef.current?.click()
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
                    </div>
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
                <button className="bg-zinc-600 rounded-full size-[40px]">
                    <Image
                        src="/arrow-up.svg"
                        width={32}
                        height={32}
                        alt="submit"
                        className="invert m-auto p-1"
                    />
                </button>
            </div>
        </div>
    )
}