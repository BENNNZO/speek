"use client"

import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { useState } from "react";

import Messages from "./components/chat/Messages";

export default function Home() {
	const [totalTokens, setTotalTokens] = useState(0)

	function finishCallback(message: string, usage: number) {
		setTotalTokens(prev => prev + usage)
	}

	const { messages, input, handleInputChange, handleSubmit, status, reload, stop } = useChat({
		api: "api/openai",
		onFinish: (message, { usage }) => { finishCallback(message.content, usage.totalTokens) }
	})

	return (
		<div className="p-12">
			{/* AI CHAT MESSAGES */}
			<Messages messages={messages} />

			{/* BOTTOM GRADIENT */}
			<div className="bottom-4 left-0 fixed bg-gradient-to-t from-black to-transparent w-full h-32"></div>
			<div className="bottom-0 left-0 fixed bg-black w-full h-4"></div>

			{/* INPUT AREA */}
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

			{/* DEBUG INFO */}
			<div className="top-4 left-4 fixed flex flex-col gap-2 bg-zinc-800 p-2 border border-white/15 rounded-2xl">
				<p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">TOKENS: {totalTokens}</p>
				<p className="bg-zinc-700 px-12 py-1 rounded-xl font-mono">STATUS: {status}</p>
				<div className="bg-white/15 mx-2 h-px"></div>
				<button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => reload()}>Reload</button>
				<button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded-xl duration-150 cursor-pointer" onClick={() => stop()}>Stop</button>
			</div>
		</div>
	);
}

// change model dropdown | or maybe just add a thinking button
// add retry button on all messages
// add a edit button to user messages
// add loading state
// error handling
// make the input box get taller as more content is added
// add support for images
// add support for multiple chats
// add new chat button