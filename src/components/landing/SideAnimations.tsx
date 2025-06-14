"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, delay, motion } from "framer-motion"

export default function SideAnimations({ lineHeight, gap, duration, widthVariation }: { lineHeight: number, gap: number, duration: number, widthVariation: number }) {
    const [lineCount, setLineCount] = useState<number | null>(null)

    useEffect(() => {
        const screenHeight = window.innerHeight
        const lineCount = Math.floor((screenHeight - gap) / (lineHeight + gap))

        setLineCount(lineCount)

        const animationResetInterval = setInterval(() => {
            setLineCount(null)

            setTimeout(() => {
                setLineCount(lineCount)
            }, 500)
        }, duration * 1000 * lineCount + 500)

        return () => clearInterval(animationResetInterval)
    }, [])

    return (
        <div className="fixed inset-0">
            <div className="top-0 left-0 absolute flex flex-col justify-between bg-black w-76 h-full" style={{ padding: gap }}>
                <AnimatePresence>
                    {lineCount && [...Array(lineCount)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, width: "0%" }}
                            animate={{ opacity: 1, width: `${(Math.random() * widthVariation) + (90 - widthVariation)}%`, transition: { duration, delay: duration * index } }}
                            exit={{ opacity: 0 }}
                            className={`rounded-xl ${Math.random() > 0.8 ? "self-end bg-zinc-800" : "self-start bg-zinc-900"}`}
                            style={{ height: lineHeight }}
                        />
                    ))}
                </AnimatePresence>
            </div>
            <div className="top-0 right-0 absolute flex flex-col justify-between bg-black w-76 h-full" style={{ padding: gap }}>
                <AnimatePresence>
                    {lineCount && [...Array(lineCount)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, width: "50%" }}
                            animate={{ opacity: 1, width: `${(Math.random() * widthVariation) + (90 - widthVariation)}%`, transition: { duration, delay: duration * index } }}
                            exit={{ opacity: 0 }}
                            className={`rounded-xl ${Math.random() > 0.8 ? "self-end bg-zinc-800" : "self-start bg-zinc-900"}`}
                            style={{ height: lineHeight }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}