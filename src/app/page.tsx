"use client"

import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit, status, reload, stop } = useChat({ api: "api/openai", onFinish: (message, { usage }) => { finishCallback(message.content, usage.totalTokens) } })

	const [totalTokens, setTotalTokens] = useState(0)

	function finishCallback(message: string, usage: number) {
		setTotalTokens(prev => prev + usage)
	}

	return (
		<div className="p-12">
			<div className="flex flex-col gap-4 mx-auto pb-32 max-w-4xl">
				{messages.map((message) => {
					switch (message.role) {
						case "user":
							return (
								<p key={message.id} className="self-end bg-zinc-800 px-4 py-2 rounded-3xl max-w-4/5">{message.content}</p>
							)
						case "assistant":
							return (
								<div key={message.id} className="flex flex-col self-start gap-4 prose-invert w-4/5 prose">
									{/* {message.parts.map((part, index) => (
										part.type === "text" && <Markdown remarkPlugins={[remarkGfm]} key={index}>{part.text}</Markdown>
									))}
									<div className="bg-white/15 h-px"></div> */}
									<div>
										{message.parts.map((part, index) => (
											part.type === "text" && <Markdown key={index}>{part.text}</Markdown>
										))}
									</div>
									{/* <div className="bg-white/15 h-px"></div>
									{message.parts.map((part, index) => (
										part.type === "text" && <p key={index}>{part.text}</p>
									))} */}
								</div>
							)
					}
				})}
			</div>

			<div className="top-4 left-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border border-white/15 rounded-2xl">
				<p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">TOKENS: {totalTokens}</p>
				<p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">STATUS: {status}</p>
				<div className="bg-white/15 mx-2 h-px"></div>
				<button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => reload()}>Reload</button>
				<button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => stop()}>Stop</button>
			</div>

			<form onSubmit={handleSubmit} className="bottom-4 left-1/2 fixed -translate-x-1/2">
				<motion.input
					required
					autoFocus
					type="text"
					placeholder="Ask Anything..."

					value={input}
					onChange={handleInputChange}

					className="bg-zinc-900 backdrop-blur-sm px-4 py-2 border rounded-full focus:outline-none w-xl"

					initial={{ scale: 0.8, borderColor: "rgba(255, 255, 255, 0.1)" }}
					animate={{ scale: 1 }}
					whileFocus={{ marginBottom: 12, borderColor: "rgba(255, 255, 255, 0.15)" }}
				/>
			</form>
		</div>
	);
}