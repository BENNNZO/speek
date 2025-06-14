"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function SideAnimations({ lineHeight, gap, delay, duration, widthVariation }: { lineHeight: number, gap: number, delay: number, duration: number, widthVariation: number }) {
    const [lineCount, setLineCount] = useState<number | null>(null)

    const { scrollY } = useScroll()

    const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.5 })

    const scrollYTransoformOpacity = useTransform(smoothScrollY, [0, 500], [1, 0])
    const scrollYTransoformPosition = useTransform(smoothScrollY, [0, 500], [0, 100])
    const scrollYTransoformPositionNeg = useTransform(smoothScrollY, [0, 500], [0, -100])

    useEffect(() => {
        const screenHeight = window.innerHeight
        const lineCount = Math.floor((screenHeight - gap) / (lineHeight + gap))

        setLineCount(lineCount)

        const animationResetInterval = setInterval(() => {
            setLineCount(null)

            setTimeout(() => {
                setLineCount(lineCount)
            }, 500)
        }, delay * 1000 * lineCount + 500)

        return () => clearInterval(animationResetInterval)
    }, [])

    return (
        <div className="fixed inset-0">
            <motion.div
                className="top-0 left-0 absolute flex flex-col justify-between w-76 h-full"
                style={{
                    opacity: scrollYTransoformOpacity || 1,
                    x: scrollYTransoformPositionNeg || 0,
                    padding: gap
                }}
            >
                <AnimatePresence>
                    {lineCount && [...Array(lineCount)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                width: "0%"
                            }}
                            animate={{
                                opacity: 1,
                                width: `${(Math.random() * widthVariation) + (90 - widthVariation)}%`,
                                transition: {
                                    duration,
                                    delay: delay * index,
                                    ease: "anticipate"
                                }
                            }}
                            exit={{
                                opacity: 0
                            }}
                            style={{
                                height: lineHeight
                            }}
                            className={`rounded-xl ${Math.random() > 0.8 ? "self-end bg-zinc-800" : "self-start bg-zinc-900"}`}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
            <motion.div
                className="top-0 right-0 absolute flex flex-col justify-between w-76 h-full"
                style={{
                    opacity: scrollYTransoformOpacity || 1,
                    x: scrollYTransoformPosition || 0,
                    padding: gap
                }}
            >
                <AnimatePresence>
                    {lineCount && [...Array(lineCount)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                width: "0%"
                            }}
                            animate={{
                                opacity: 1,
                                width: `${(Math.random() * widthVariation) + (90 - widthVariation)}%`,
                                transition: {
                                    duration,
                                    delay: delay * index,
                                    ease: "anticipate"
                                }
                            }}
                            exit={{
                                opacity: 0
                            }}
                            style={{
                                height: lineHeight
                            }}
                            className={`rounded-xl ${Math.random() > 0.8 ? "self-end bg-zinc-800" : "self-start bg-zinc-900"}`}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}



// ass you scroll the lines fade from bottom to top
// use useTransform inline styles if possible if not probably dont do this