"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center gap-16 h-screen">
            <div className="relative flex flex-col items-center gap-8">
                <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
                    className="bottom-[calc(100%+3rem)] left-1/2 absolute flex gap-1 bg-gradient-to-r from-indigo-700 to-indigo-950 drop-shadow-xl px-4 py-1 border-t border-t-white/25 rounded-full -translate-x-1/2"
                >
                    <FadeEachWord text="#1 Cost Effective AI Chat" />
                </motion.p>
                <div className="z-10 flex gap-12">
                    <FadeLetters text="Speek" />
                    <AI />
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.75, transition: { delay: 0.8 } }}
                    className="z-10 flex gap-1.5 mt-4 text-2xl text-center"
                >
                    <FadeEachWord text="Just An AI Chat. Noting More. Nothing Less." />
                </motion.p>
                <div className="z-10 flex gap-4">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
                        whileHover={{ y: -2, filter: "brightness(1.25)" }}
                        whileTap={{ y: 0 }}
                        className="flex gap-2 bg-white shadow-lg py-2 pr-4 pl-5 rounded-full font-semibold text-black text-lg cursor-pointer"
                    >
                        <p className="tracking-wide">Try Speek Free</p>
                        <Image
                            src="/arrow-forward.svg"
                            width={24}
                            height={24}
                            alt="arrow"
                        />
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 1.2 } }}
                        whileHover={{ y: -2, filter: "brightness(1.25)" }}
                        whileTap={{ y: 0 }}
                        className="flex gap-2 bg-gradient-to-br from-indigo-800 to-indigo-950 shadow-lg px-4 py-2 border-t border-t-white/35 rounded-full font-semibold text-lg cursor-pointer"
                    >
                        <p className="tracking-wide">Why Choose Speek</p>
                    </motion.button>
                </div>
                <div className="z-0 absolute inset-0">
                    <div className="top-1/2 left-1/2 absolute bg-indigo-700 blur-3xl rounded-[100%] w-md h-24 -rotate-[20deg] scale-125 -translate-1/2"></div>
                    <div className="top-1/2 left-1/2 absolute bg-indigo-500 blur-lg rounded-[100%] w-sm h-2 -rotate-[20deg] scale-125 -translate-1/2"></div>
                    <div className="top-1/2 left-1/2 absolute bg-indigo-400 blur-sm rounded-[100%] w-sm h-0.5 -rotate-[20deg] scale-125 -translate-1/2"></div>
                    <div className="top-3/4 left-1/2 absolute bg-indigo-400 blur-2xl rounded-[100%] w-sm h-2 rotate-[20deg] -translate-1/2"></div>
                    <div className="top-0 left-1/2 absolute bg-indigo-600 blur-2xl rounded-[100%] w-sm h-4 rotate-12 scale-110 -translate-1/2"></div>
                    <div className="top-full left-1/2 absolute bg-indigo-800/50 blur-2xl rounded-[100%] w-sm h-24 -translate-1/2"></div>
                    <div className="top-1/4 left-11/12 absolute bg-indigo-800/50 blur-2xl rounded-[100%] w-40 h-24 rotate-45 -translate-1/2"></div>
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

function FadeEachWord({ text }: { text: string }) {
    return (
        <>
            {text.split(" ").map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: index / 10 + 0.6 } }}
                >
                    {word}
                </motion.span>
            ))}
        </>
    )
}

function AI() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: 0.4 } }}
            className="relative shadow-md w-24"
        >
            <motion.div
                initial={{ opacity: 0, background: "rgba(0, 0, 0, 0)", width: "7.5rem", height: "7.5rem", borderRadius: "1.5rem" }}
                animate={{ opacity: 1, background: "rgba(0, 0, 0, 0.25)", width: "8rem", height: "8rem", borderRadius: "1.5rem", transition: { delay: 0.4 } }}
                whileHover={{ borderRadius: "2.5rem" }}
                className="top-1/2 left-1/2 absolute place-items-center grid backdrop-blur-md border-t border-t-white/25 -translate-1/2"
            >
                <motion.p
                    initial={{ fontSize: "6rem" }}
                    animate={{ fontSize: "5rem", transition: { delay: 0.4 } }}
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