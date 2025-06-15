"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function AuthPage() {
    const [newUser, setNewUser] = useState(false)

    const providers = [
        {
            title: "Google",
            src: "/logo-google.svg"
        },
        {
            title: "Apple",
            src: "/logo-apple.svg"
        },
        {
            title: "Github",
            src: "/logo-github.svg"
        }
    ]

    return (
        <div className="place-items-center grid w-screen h-screen">
            <div className="z-10 relative flex flex-col gap-4 bg-gradient-to-b from-zinc-900 to-transparent backdrop-blur-sm mb-24 sm:mb-0 p-4 rounded-3xl overflow-hidden bt">
                <div className="-top-12 left-0 absolute bg-indigo-600 blur-3xl rounded-[100%] w-full h-24"></div>
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={newUser ? "sign-up" : "sign-in"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="z-10 my-3 font-bold text-4xl text-center tracking-wide"
                    >
                        {newUser ? "Sign Up" : "Sign In"}
                    </motion.h1>
                </AnimatePresence>
                <div className="bg-white/15 w-full h-px"></div>
                <div className="flex justify-center items-center gap-2 mx-4">
                    <p className="opacity-80 text-sm text-center animate-pulse">Credentials are currently disabled</p>
                    <Link href="/privacy" className="text-indigo-400 text-sm hover:underline">Why?</Link>
                </div>
                <AnimatePresence mode="wait">
                    {newUser ? (
                        <motion.div
                            key="sign-up"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 0.5, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-3 overflow-hidden pointer-events-none"
                        >
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Username" />
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Email" />
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Password" />
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Confirm Password" />
                            <button className="bg-indigo-600 hover:bg-indigo-500 mt-3 py-2 rounded-2xl line-through duration-150">Sign Up</button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sign-in"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 0.5, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-3 overflow-hidden pointer-events-none"
                        >
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Email" />
                            <input type="text" className="bg-zinc-800 px-3 py-2 rounded-2xl line-through bt" placeholder="Password" />
                            <p className="opacity-50 text-xs text-right">Forgot Password?</p>
                            <button className="bg-indigo-600 hover:bg-indigo-500 mt-2 py-2 rounded-2xl line-through duration-150">Sign In</button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex items-center gap-2 mt-4">
                    <div className="bg-white/15 w-full h-px"></div>
                    <p className="opacity-50 text-sm whitespace-nowrap">
                        Or
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={newUser ? "sign-up" : "sign-in"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {newUser ? " Sign Up " : " Sign In "}
                            </motion.span>
                        </AnimatePresence>
                        With
                    </p>
                    <div className="bg-white/15 w-full h-px"></div>
                </div>
                <div className="flex flex-row justify-around gap-2">
                    {providers.map(provider => (
                        <button
                            key={provider.title}
                            className={`shadow-md p-2 w-full grid place-items-center rounded-2xl bg-zinc-800 bt hover:bg-zinc-700 duration-150 cursor-pointer ${provider.title !== "Google" ? "opacity-50 scale-95 pointer-events-none" : ""}`}
                            onClick={() => signIn(provider.title.toLowerCase(), { redirectTo: "/chat" })}
                        >
                            <Image
                                src={provider.src}
                                width={32}
                                height={32}
                                alt={`${provider.title.toLowerCase()}-logo`}
                                className="invert"
                            />
                        </button>
                    ))}
                </div>
                <div className="flex justify-center gap-2 mx-4 mt-4 mb-1">
                    <p className="opacity-80 text-sm">Don{`'`}t have an account?</p>
                    <AnimatePresence mode="wait">
                        <motion.button
                            key={newUser ? "sign-up" : "sign-in"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-indigo-400 text-sm hover:underline"
                            onClick={() => setNewUser(prev => !prev)}
                        >
                            {newUser ? " Sign Up " : " Sign In "}
                        </motion.button>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}