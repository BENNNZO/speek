"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Props {
    input: string,
    thinking: boolean,
    setThinking: React.Dispatch<React.SetStateAction<boolean>>,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, options: { body: { model: string } }) => void
}

export default function InputArea({ thinking, setThinking, input, handleInputChange, handleSubmit }: Props) {
    return (
        <div className="bottom-8 left-1/2 fixed flex gap-2 -translate-x-1/2">
            <motion.button
                onClick={() => setThinking(prev => !prev)}
                className={`self-end ${thinking ? "bg-blue-950 hover:bg-blue-900 border-blue-500 hover:border-blue-400 text-white" : "bg-zinc-900 hover:bg-zinc-800 border-white/15 hover:border-white/25 text-zinc-400"} p-1.5 aspect-square border-t rounded-full duration-150 cursor-pointer active:scale-95`}
            >
                <Image src="/add.svg" width={28} height={28} alt="reasoning" className="invert" style={{ opacity: thinking ? 1 : 0.5 }} />
            </motion.button>

            <motion.button
                onClick={() => setThinking(prev => !prev)}
                className={`self-end ${thinking ? "bg-blue-950 hover:bg-blue-900 border-blue-500 hover:border-blue-400 text-white" : "bg-zinc-900 hover:bg-zinc-800 border-white/15 hover:border-white/25 text-zinc-400"} p-2 aspect-square border-t rounded-full duration-150 cursor-pointer active:scale-95`}
            >
                <Image src="/bulb.svg" width={24} height={24} alt="reasoning" className="invert" style={{ opacity: thinking ? 1 : 0.5 }} />
            </motion.button>

            <form
                onSubmit={(event) => {
                    handleSubmit(event, {
                        body: {
                            model: thinking ? "o4-mini" : "gpt-4.1-nano"
                        }
                    })
                }}
                className="flex gap-2 bg-zinc-800 py-1.5 pr-1.5 pl-4 border-white/15 border-t rounded-full"
            >
                <input
                    required
                    autoFocus
                    type="text"
                    placeholder="Ask Anything..."
                    value={input}
                    onChange={handleInputChange}
                    className="focus:outline-none w-md"
                />
            </form>
        </div>
    )
}