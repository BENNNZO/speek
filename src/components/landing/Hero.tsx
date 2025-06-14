"use client"

import { motion } from "framer-motion"

export default function Hero() {
    return (
        <div className="place-items-center grid h-screen">
            <div className="flex flex-col gap-2">
                <Header text="Speek AI" />
                <SubHeader text="Intuitive, Sleek, Minimal." />
            </div>
        </div>
    )
}

function Header({ text }: { text: string }) {
    const letters = [...text.split("")]

    return (
        <div className="flex gap-2">
            {letters.map((letter, index) => (
                <FadeInFromLeft
                    text={letter}
                    delay={index / 15}
                    key={index}
                    className="font-bold text-8xl"
                />
            ))}
        </div>
    )
}

function SubHeader({ text }: { text: string }) {
    const words = [...text.split(" ")]

    return (
        <div className="flex gap-3">
            {words.map((word, index) => (
                <FadeInFromLeft
                    text={word}
                    delay={(index / 5) + 0.5}
                    key={index}
                    className="text-zinc-500 text-2xl"
                />
            ))}
        </div>
    )
}

function FadeInFromLeft({ text, delay, className }: { text: string, delay: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { delay } }}
            className={`${className} ${text.trim() === "" ? "w-12" : ""}`}
        >
            {text}
        </motion.div>
    )
}