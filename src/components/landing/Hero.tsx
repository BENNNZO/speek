"use client"

import { motion } from "framer-motion"

export default function Hero() {
    return (
        <div className="place-items-center grid h-screen">
            <div className="flex flex-col gap-2">
                <div className="flex gap-12">
                    <FadeLetters text="Speek" />
                    <AI />
                </div>
                <FadeWords text="Intuitive, Sleek, Minimal." />
            </div>
        </div>
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
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [1, 1],
                    background: ["rgb(0, 0, 0)", "rgb(255, 255, 255)"],
                    width: ["7.5rem", "8rem"],
                    height: ["7.5rem", "8rem"],
                    transition: { repeat: 0, repeatType: "mirror", repeatDelay: 1, delay: 0.4 }
                }}
                className="top-1/2 left-1/2 absolute place-items-center grid rounded-3xl -translate-1/2"
            >
                <motion.p
                    animate={{
                        color: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"],
                        fontSize: ["6rem", "5rem"],
                        transition: { repeat: 0, repeatType: "mirror", repeatDelay: 1, delay: 0.4 }
                    }}
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

function FadeWords({ text }: { text: string }) {
    const words = [...text.split(" ")]

    return (
        <div className="flex gap-3">
            {words.map((word, index) => (
                <FadeInFromLeft
                    text={word}
                    delay={(index / 5) + 0.6}
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
            className={className}
        >
            {text}
        </motion.div>
    )
}