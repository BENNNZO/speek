"use client"

import { useChat } from "@ai-sdk/react";

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "api/openai" })

	return (
		<div className="p-12">
			<div className="flex flex-col gap-4 mx-auto pb-32 max-w-4xl">
				{messages.map((message) => {
					switch (message.role) {
						case "user":
							return (
								<p className="self-end bg-zinc-800 px-3 py-2 rounded-full">{message.content}</p>
							)
						case "assistant":
							return (
								<p className="self-start w-4/5">{message.content}</p>
							)
					}
				})}
			</div>

			<form onSubmit={handleSubmit} className="bottom-4 left-1/2 fixed -translate-x-1/2">
				<input
					autoFocus
					type="text"
					placeholder="Ask Anything..."
					value={input}
					onChange={handleInputChange}
					className="bg-zinc-900 px-4 py-2 border border-white/15 rounded-full"
				/>
			</form>
		</div>
	);
}