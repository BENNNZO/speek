"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center gap-20 h-screen">
            <div className="relative flex flex-col gap-4">
                <CostEffectiveAIChat />
                <div className="flex gap-12">
                    <FadeLetters text="Speek" />
                    <AI />
                </div>
            </div>
            <Image
                src="/chevron-down.svg"
                width={32}
                height={32}
                alt="down icon"
                className="bottom-12 left-1/2 absolute invert -translate-x-1/2 animate-pulse"
            />
        </div>
    )
}

function CostEffectiveAIChat() {
    return (
        <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
            className="bottom-[calc(100%+2rem)] left-1/2 absolute flex gap-1 bg-gradient-to-r from-indigo-700 to-indigo-950 px-4 py-1 border-t border-t-white/25 rounded-full -translate-x-1/2"
        >
            {"#1 Cost Effective AI Chat".split(" ").map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: index / 10 + 0.6 } }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.p>
    )
}

function AI() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: 0.4 } }}
            className="relative w-24"
        >
            <motion.div
                initial={{ opacity: 0, background: "rgb(0, 0, 0)", width: "7.5rem", height: "7.5rem" }}
                animate={{ opacity: 1, background: "rgb(255, 255, 255)", width: "8rem", height: "8rem", transition: { delay: 0.4 } }}
                className="top-1/2 left-1/2 absolute place-items-center grid rounded-3xl -translate-1/2"
            >
                <motion.p
                    initial={{ color: "rgb(255, 255, 255)", fontSize: "6rem" }}
                    animate={{ color: "rgb(0, 0, 0)", fontSize: "5rem", transition: { delay: 0.4 } }}
                    className="top-1/2 left-1/2 absolute font-bold -translate-1/2"
                >
                    AI
                </motion.p>
            </motion.div>
        </motion.div>
    )
}

function FadeLetters({ text }: { text: string }) {
    const letters = [...text.split("")]

    return (
        <div className="flex gap-2">
            {letters.map((letter, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: index / 15 } }}
                    className="font-bold text-8xl"
                >
                    {letter}
                </motion.div>
            ))}
        </div>
    )
}